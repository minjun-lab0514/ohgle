// src/components/InterpretationList.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import InterpretationCard from './InterpretationCard';
import './InterpretationList.css';

export default function InterpretationList({ quoteId }) {
  const [interpretations, setInterpretations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!quoteId) return;

    const q = query(
      collection(db, 'quotes', quoteId, 'interpretations'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setInterpretations(data);
        setLoading(false);
      },
      (err) => {
        console.error('해석 불러오기 오류:', err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [quoteId]);

  if (loading) {
    return (
      <section className="list-section">
        <div className="list-loading">
          <div className="list-spinner" />
          <span>해석을 불러오는 중...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="list-section">
      <div className="list-header">
        <h2 className="list-title">모든 해석</h2>
        {interpretations.length > 0 && (
          <span className="list-count">{interpretations.length}개</span>
        )}
      </div>

      {interpretations.length === 0 ? (
        <div className="list-empty">
          <span className="list-empty-icon">🌱</span>
          <p className="list-empty-text">
            아직 남겨진 해석이 없어요.<br />
            가장 먼저 당신의 해석을 남겨보세요!
          </p>
        </div>
      ) : (
        <div className="list-cards">
          {interpretations.map((item) => (
            <InterpretationCard
              key={item.id}
              interpretation={item}
              quoteId={quoteId}
            />
          ))}
        </div>
      )}
    </section>
  );
}
