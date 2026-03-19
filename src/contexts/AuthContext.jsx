// src/contexts/AuthContext.jsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const AuthContext = createContext(null);

// 모듈 레벨 함수 — 안정적 참조, useEffect deps 오염 없음
async function fetchNicknameFromDB(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data().nickname : null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSetNickname, setShowSetNickname] = useState(false);

  // 함수 참조를 ref에 저장 — setState에 함수를 넣으면 updater로 해석되는 문제 회피
  const pendingActionRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const nick = await fetchNicknameFromDB(firebaseUser.uid);
        setNickname(nick);
      } else {
        setUser(null);
        setNickname(null);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // 로그인이 필요한 액션을 요청할 때 호출
  // action: 로그인+닉네임 완료 후 실행할 콜백 (없으면 null)
  function requireAuth(action) {
    pendingActionRef.current = action ?? null;
    if (user && !nickname) {
      setShowSetNickname(true);
    } else {
      setShowLoginModal(true);
    }
  }

  async function loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      setUser(firebaseUser);
      const nick = await fetchNicknameFromDB(firebaseUser.uid);
      setShowLoginModal(false);
      if (nick) {
        setNickname(nick);
        pendingActionRef.current?.();
        pendingActionRef.current = null;
      } else {
        setShowSetNickname(true);
      }
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') {
        console.error('로그인 실패:', err);
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    }
  }

  async function saveNickname(nick) {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      nickname: nick,
      createdAt: serverTimestamp(),
    });
    setNickname(nick);
    setShowSetNickname(false);
    pendingActionRef.current?.();
    pendingActionRef.current = null;
  }

  async function checkNicknameAvailable(nick) {
    const q = query(collection(db, 'users'), where('nickname', '==', nick));
    const snap = await getDocs(q);
    return snap.empty;
  }

  async function logout() {
    await signOut(auth);
    setUser(null);
    setNickname(null);
    pendingActionRef.current = null;
  }

  return (
    <AuthContext.Provider value={{
      user,
      nickname,
      authLoading,
      showLoginModal,
      setShowLoginModal,
      showSetNickname,
      requireAuth,
      loginWithGoogle,
      saveNickname,
      checkNicknameAvailable,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
