// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 개발 단계에서 환경 변수 누락을 빠르게 파악하기 위한 경고 추가
if (import.meta.env.DEV) {
  const missingKeys = Object.entries(firebaseConfig)
    // eslint-disable-next-line no-unused-vars
    .filter(([_, value]) => !value)
    .map(([key]) => key);
  
  if (missingKeys.length > 0) {
    console.error(`🚨 [Firebase 설정 오류] 환경 변수가 누락되었습니다: ${missingKeys.join(', ')}`);
  }
}

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
