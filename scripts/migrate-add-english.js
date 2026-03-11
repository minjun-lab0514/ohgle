/* global process */
// scripts/migrate-add-english.js
// Firestore quotes 컬렉션에 영어 명언(en) 및 영어 저자(author_en) 필드를 추가합니다.

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// serviceAccountKey.json 파일을 루트에 넣어주세요
const serviceAccount = require(join(__dirname, '..', 'serviceAccountKey.json'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// 사용자가 제공하는 영어 데이터를 여기에 채워넣으면 됩니다.
// index 순서대로 배열을 구성합니다.
const englishData = [
  {
    // 1. 헨리 포드
    en: "Whether you think you can, or you think you can't – you're right.",
    author_en: "Henry Ford",
  },
  {
    // 2. 아인슈타인
    en: "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    author_en: "Albert Einstein",
  },
  {
    // 3. 아리스토텔레스
    en: "Well begun is half done.",
    author_en: "Aristotle",
  },
  {
    // 4. 헨리 포드
    en: "Failure is simply the opportunity to begin again, this time more intelligently.",
    author_en: "Henry Ford",
  },
  {
    // 5. 벤자민 프랭클린
    en: "Don't put off until tomorrow what you can do today.",
    author_en: "Benjamin Franklin",
  },
  {
    // 6. 랄프 왈도 에머슨
    en: "Happiness is not a destination, it is a way of travel.",
    author_en: "Ralph Waldo Emerson",
  },
  {
    // 7. 넬슨 만델라 ✅ 수정 — 더 유명한 원문
    en: "Courage is not the absence of fear, but the triumph over it.",
    author_en: "Nelson Mandela",
  },
  {
    // 8. 빅토르 위고
    en: "Even the darkest night will end and the sun will rise.",
    author_en: "Victor Hugo",
  },
  {
    // 9. 월트 디즈니
    en: "All our dreams can come true, if we have the courage to pursue them.",
    author_en: "Walt Disney",
  },
  {
    // 10. 루미
    en: "Everything that seems difficult today will one day become your strength.",
    author_en: "Rumi",
  },
  {
    // 11. 알베르 카뮈
    en: "The most courageous act is to live true to yourself.",
    author_en: "Albert Camus",
  },
  {
    // 12. 레오나르도 다빈치 ✅ 수정 — 한국어 의미에 맞게
    en: "Small deeds done are better than great deeds planned. Great things are made of small ones.",
    author_en: "Leonardo da Vinci",
  },
  {
    // 13. 노먼 빈센트 필
    en: "Believe in yourself! Have faith in your abilities! Without a humble but reasonable confidence in your own powers you cannot be successful or happy.",
    author_en: "Norman Vincent Peale",
  },
  {
    // 14. 윈스턴 처칠
    en: "Never, never, never give up.",
    author_en: "Winston Churchill",
  },
  {
    // 15. 아인슈타인
    en: "A person who never made a mistake never tried anything new.",
    author_en: "Albert Einstein",
  },
  {
    // 16. 프랜시스 베이컨
    en: "Knowledge is power.",
    author_en: "Francis Bacon",
  },
  {
    // 17. 헬렌 켈러 ✅ 수정 — 한국어 의미에 맞게
    en: "Avoiding danger is no safer in the long run than outright exposure. Life is either a daring adventure or nothing.",
    author_en: "Helen Keller",
  },
  {
    // 18. 파블로 피카소
    en: "The meaning of life is to find your gift. The purpose of life is to give it away.",
    author_en: "Pablo Picasso",
  },
  {
    // 19. 인디언 속담
    en: "Live well today, and yesterday becomes a beautiful dream, tomorrow a hopeful vision.",
    author_en: "Native American Proverb",
  },
  {
    // 20. 노자
    en: "A journey of a thousand miles begins with a single step.",
    author_en: "Lao Tzu",
  },
];

async function migrate() {
  console.log('영어 명언 데이터 마이그레이션 시작...');
  const quotesRef = db.collection('quotes');
  const snapshot = await quotesRef.orderBy('index').get();

  if (snapshot.empty) {
    console.log('명언 데이터가 없습니다.');
    process.exit(0);
  }

  const batch = db.batch();
  let count = 0;

  snapshot.docs.forEach((doc, idx) => {
    if (idx < englishData.length) {
      batch.update(doc.ref, englishData[idx]);
      count++;
    }
  });

  await batch.commit();
  console.log(`✅ ${count}개 명언에 영어 데이터 추가 완료!`);
  process.exit(0);
}

migrate().catch((err) => {
  console.error('❌ 마이그레이션 실패:', err);
  process.exit(1);
});
