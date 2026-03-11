// src/hooks/useQuote.js
import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

/**
 * 날짜 기반 시드로 오늘의 명언 인덱스를 계산합니다.
 * YYYYMMDD 숫자를 전체 명언 수로 나눈 나머지를 사용합니다.
 */
function getTodayIndex(totalCount) {
  const now = new Date();
  const dateNum =
    now.getFullYear() * 10000 +
    (now.getMonth() + 1) * 100 +
    now.getDate();
  return dateNum % totalCount;
}

export function useQuote() {
  const [quote, setQuote] = useState(null);
  const [quoteId, setQuoteId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuote() {
      try {
        setLoading(true);
        const q = query(collection(db, 'quotes'), orderBy('index'));
        const snapshot = await getDocs(q);

        if (snapshot.empty) {
          setError('명언 데이터가 없습니다. Firestore에 데이터를 추가해주세요.');
          return;
        }

        const quotes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const todayIndex = getTodayIndex(quotes.length);
        const todayQuote = quotes[todayIndex];

        setQuote(todayQuote);
        setQuoteId(todayQuote.id);
      } catch (err) {
        console.error('명언 불러오기 실패:', err);
        setError('명언을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    }

    fetchQuote();
  }, []);

  return { quote, quoteId, loading, error };
}
