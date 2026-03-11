// src/components/QuoteDisplay.jsx
import { useState } from 'react';
import './QuoteDisplay.css';

const DAYS_KO = ['일', '월', '화', '수', '목', '금', '토'];

function formatDate(date) {
  const d = DAYS_KO[date.getDay()];
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${y}년 ${m}월 ${day}일 (${d})`;
}

export default function QuoteDisplay({ quote }) {
  const [lang, setLang] = useState(() => localStorage.getItem('ohgle_lang') || 'ko');
  const today = new Date();

  // quote.en 필드가 있으면 토글 표시 여부
  const hasEnglish = Boolean(quote.en && quote.author_en);

  // 표시할 데이터 결정
  const displayQuote = lang === 'en' && hasEnglish ? quote.en : quote.text;
  const displayAuthor = lang === 'en' && hasEnglish ? quote.author_en : quote.author;
  const displayBadge = lang === 'en' && hasEnglish ? "Today's Quote" : "오늘의 명언";

  return (
    <section className="quote-display">
      <p className="quote-date">{formatDate(today)}</p>
      <span className="quote-badge">{displayBadge}</span>

      <blockquote>
        <span className="quote-mark">"</span>
        <p className="quote-text">{displayQuote}</p>
        <cite className="quote-author">{displayAuthor}</cite>
      </blockquote>

      <div className="quote-divider" />

      {hasEnglish && (
        <div className="quote-lang-toggle">
          <button 
            className={`lang-btn ${lang === 'ko' ? 'active' : ''}`}
            onClick={() => { setLang('ko'); localStorage.setItem('ohgle_lang', 'ko'); }}
          >
            한글
          </button>
          <button 
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => { setLang('en'); localStorage.setItem('ohgle_lang', 'en'); }}
          >
            EN
          </button>
        </div>
      )}
    </section>
  );
}
