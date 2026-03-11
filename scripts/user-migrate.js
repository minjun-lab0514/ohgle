// ============================================================
// 🌐 Ohgle 명언 영어 번역 추가 스크립트
// 사용법: 터미널에서 → node migrate-add-english.js
// ============================================================

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA3XW_yeKrxDwQi5xifGJGSzmphy5yDfsc",
  authDomain: "ohgle-eed2d.firebaseapp.com",
  projectId: "ohgle-eed2d",
  storageBucket: "ohgle-eed2d.firebasestorage.app",
  messagingSenderId: "42398178632",
  appId: "1:42398178632:web:0c01d2f26ee368b054a77d",
  measurementId: "G-PNE7R0XNR5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ 영어 번역 (index 순서대로 0~19)
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
  console.log('🚀 마이그레이션 시작...');

  const q = query(collection(db, 'quotes'), orderBy('index'));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.error('❌ Firestore에 명언 데이터가 없습니다.');
    return;
  }

  const docs = snapshot.docs;
  console.log(`📚 명언 ${docs.length}개 발견`);

  for (let i = 0; i < docs.length; i++) {
    const docRef = doc(db, 'quotes', docs[i].id);
    const data = englishData[i];

    if (!data) {
      console.warn(`⚠️  index ${i}에 해당하는 영어 데이터 없음, 건너뜀`);
      continue;
    }

    await updateDoc(docRef, {
      en: data.en,
      author_en: data.author_en,
    });

    console.log(`✅ [${i}] ${docs[i].data().text?.slice(0, 20)}... → 완료`);
  }

  console.log('\n🎉 마이그레이션 완료! Firestore에 en, author_en 필드가 추가되었습니다.');
}

migrate().catch(console.error);
