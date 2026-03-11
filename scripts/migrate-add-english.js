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
  { en: "Whether you think you can, or you think you can't, you're right.", author_en: "Henry Ford" },
  { en: "Life is like riding a bicycle. To keep your balance, you must keep moving.", author_en: "Albert Einstein" },
  { en: "Well begun is half done.", author_en: "Aristotle" },
  { en: "Failure is simply the opportunity to begin again, this time more intelligently.", author_en: "Henry Ford" },
  { en: "Don't put off until tomorrow what you can do today.", author_en: "Benjamin Franklin" },
  { en: "Happiness is a journey, not a destination.", author_en: "Ralph Waldo Emerson" },
  { en: "I learned that courage was not the absence of fear, but the triumph over it.", author_en: "Nelson Mandela" },
  { en: "Even the darkest night will end and the sun will rise.", author_en: "Victor Hugo" },
  { en: "If you can dream it, you can do it.", author_en: "Walt Disney" },
  { en: "Everything that is made beautiful and fair and lovely is made for the eye of one who sees.", author_en: "Rumi" },
  { en: "The most courageous act is still to think for yourself. Aloud.", author_en: "Albert Camus" },
  { en: "Do your best in small things. Big things are made of small things.", author_en: "Leonardo da Vinci" },
  { en: "Believe in yourself. Have faith in your abilities. Without a humble but reasonable confidence in your own powers you cannot be successful or happy.", author_en: "Norman Vincent Peale" },
  { en: "Never, never, never give up.", author_en: "Winston Churchill" },
  { en: "A person who never made a mistake never tried anything new.", author_en: "Albert Einstein" },
  { en: "Knowledge is power.", author_en: "Francis Bacon" },
  { en: "People who fear change lose nothing, but they gain nothing either.", author_en: "Helen Keller" },
  { en: "The meaning of life is to find your gift. The purpose of life is to give it away.", author_en: "Pablo Picasso" },
  { en: "If we live well today, yesterday becomes a beautiful dream, and tomorrow a vision of hope.", author_en: "Native American Proverb" },
  { en: "A journey of a thousand miles begins with a single step.", author_en: "Lao Tzu" },
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
