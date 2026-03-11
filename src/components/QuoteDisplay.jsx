// src/components/QuoteDisplay.jsx
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
  const today = new Date();

  return (
    <section className="quote-display">
      <p className="quote-date">{formatDate(today)}</p>
      <span className="quote-badge">오늘의 명언</span>

      <blockquote>
        <span className="quote-mark">"</span>
        <p className="quote-text">{quote.text}</p>
        <cite className="quote-author">{quote.author}</cite>
      </blockquote>

      <div className="quote-divider" />
    </section>
  );
}
