// src/components/InterpretationCard.jsx
import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import './InterpretationCard.css';

function GoogleUserIcon() {
  return (
    <svg
      className="card-google-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M21.805 10.023H12v3.977h5.617c-.242 1.242-.977 2.297-2.082 3l3.227 2.508C20.533 17.664 21.805 15.047 21.805 12c0-.668-.055-1.312-.156-1.977z"
      />
      <path
        fill="currentColor"
        d="M12 22c2.7 0 4.965-.895 6.621-2.43l-3.227-2.508C14.484 17.742 13.305 18.09 12 18.09c-2.648 0-4.895-1.789-5.699-4.195L2.965 16.41C4.594 19.652 8.047 22 12 22z"
      />
      <path
        fill="currentColor"
        d="M6.301 13.895A6.133 6.133 0 0 1 5.91 12c0-.664.113-1.305.391-1.895L2.965 7.59A9.965 9.965 0 0 0 2 12c0 1.617.387 3.148 1.074 4.5z"
      />
      <path
        fill="currentColor"
        d="M12 5.91c1.477 0 2.797.508 3.836 1.504l2.875-2.875C16.957 2.895 14.695 2 12 2 8.047 2 4.594 4.348 2.965 7.59l3.336 2.515C7.105 7.699 9.352 5.91 12 5.91z"
      />
    </svg>
  );
}

function getInitial(nickname) {
  return nickname ? nickname[0].toUpperCase() : '?';
}

function timeAgo(date) {
  if (!date) return '';
  const seconds = Math.floor((Date.now() - date) / 1000);
  if (seconds < 60) return '방금 전';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}분 전`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}시간 전`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}일 전`;
  const d = new Date(date);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function InterpretationCard({ interpretation, quoteId }) {
  const { user, requireAuth } = useAuth();
  const { id, nickname, text, likes = 0, likedBy = [], createdAt, uid } = interpretation;

  const isLiked = user ? likedBy.includes(user.uid) : false;
  const [optimisticLiked, setOptimisticLiked] = useState(isLiked);
  const [optimisticLikes, setOptimisticLikes] = useState(likes);
  const [animating, setAnimating] = useState(false);

  // 로그인/로그아웃 시 서버 상태로 리셋
  useEffect(() => {
    const liked = user ? likedBy.includes(user.uid) : false;
    setOptimisticLiked(liked);
    setOptimisticLikes(likes);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.uid]);

  function handleLikeClick() {
    if (!user) {
      requireAuth(null);
      return;
    }
    doLike();
  }

  async function doLike() {
    if (!user) return;
    const newLiked = !optimisticLiked;

    setOptimisticLiked(newLiked);
    setOptimisticLikes((prev) => prev + (newLiked ? 1 : -1));

    if (newLiked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 400);
    }

    try {
      const ref = doc(db, 'quotes', quoteId, 'interpretations', id);
      await updateDoc(ref, {
        likes: increment(newLiked ? 1 : -1),
        likedBy: newLiked ? arrayUnion(user.uid) : arrayRemove(user.uid),
      });
    } catch (err) {
      setOptimisticLiked(!newLiked);
      setOptimisticLikes((prev) => prev + (newLiked ? -1 : 1));
      console.error('좋아요 업데이트 실패:', err);
    }
  }

  const createdTime = createdAt?.toDate ? createdAt.toDate().getTime() : null;

  return (
    <article className="card">
      <div className="card-header">
        <div className="card-author">
          <div className="card-avatar">{getInitial(nickname)}</div>
          <span className="card-nickname">
            {nickname}
            {uid && <GoogleUserIcon />}
          </span>
        </div>
        <span className="card-time">{timeAgo(createdTime)}</span>
      </div>

      <p className="card-text">{text}</p>

      <button
        className={`card-like-btn${optimisticLiked ? ' liked' : ''}`}
        onClick={handleLikeClick}
        aria-label={`좋아요 ${optimisticLikes}개`}
      >
        <span className={`heart-icon${animating ? ' liked' : ''}`}>
          {optimisticLiked ? '🧡' : '🤍'}
        </span>
        {optimisticLikes > 0 && <span>{optimisticLikes}</span>}
      </button>
    </article>
  );
}
