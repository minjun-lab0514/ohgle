// src/components/InterpretationCard.jsx
import { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import './InterpretationCard.css';

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
  const { id, nickname, text, likes = 0, likedBy = [], createdAt } = interpretation;

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
          <span className="card-nickname">{nickname}</span>
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
