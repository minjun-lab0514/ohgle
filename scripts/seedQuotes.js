// scripts/seedQuotes.js
// Firebase Admin SDK로 초기 명언 데이터를 Firestore에 업로드하는 스크립트
// 사용법:
//   1. npm install firebase-admin (프로젝트 루트에서)
//   2. Firebase 콘솔 > 프로젝트 설정 > 서비스 계정 > 새 비공개 키 생성 → serviceAccountKey.json 저장
//   3. node scripts/seedQuotes.js

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

// serviceAccountKey.json 파일을 scripts 폴더 또는 루트에 넣어주세요
const serviceAccount = require(join(__dirname, '..', 'serviceAccountKey.json'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const quotes = [
  { index: 0,  text: '당신이 할 수 있다고 생각하든, 할 수 없다고 생각하든, 당신 말이 맞다.', author: '헨리 포드' },
  { index: 1,  text: '인생은 자전거를 타는 것과 같다. 균형을 잡으려면 계속 움직여야 한다.', author: '알베르트 아인슈타인' },
  { index: 2,  text: '시작이 반이다.', author: '아리스토텔레스' },
  { index: 3,  text: '실패란 더 현명하게 다시 시작할 수 있는 기회다.', author: '헨리 포드' },
  { index: 4,  text: '오늘 할 수 있는 일을 내일로 미루지 마라.', author: '벤자민 프랭클린' },
  { index: 5,  text: '행복은 목적지가 아니라 여행 방식이다.', author: '랄프 왈도 에머슨' },
  { index: 6,  text: '용기란 두려움이 없는 것이 아니라, 두려움보다 더 중요한 것이 있다고 판단하는 것이다.', author: '넬슨 만델라' },
  { index: 7,  text: '가장 어두운 밤도 끝나고 해는 뜰 것이다.', author: '빅토르 위고' },
  { index: 8,  text: '꿈을 꿀 수 있다면, 그것을 이룰 수도 있다.', author: '월트 디즈니' },
  { index: 9,  text: '지금 어렵다고 느끼는 모든 것이 언젠가는 당신의 힘이 된다.', author: '루미' },
  { index: 10, text: '세상에서 가장 용감한 일은 자기 자신답게 사는 것이다.', author: '알베르 카뮈' },
  { index: 11, text: '작은 일에도 최선을 다하라. 큰 일은 작은 일들이 모여 이루어진다.', author: '레오나르도 다빈치' },
  { index: 12, text: '자신을 믿어라. 당신의 능력을 믿어라. 그 믿음 없이는 성공도 행복도 없다.', author: '노먼 빈센트 필' },
  { index: 13, text: '중요한 것은 포기하지 않는 것이다.', author: '윈스턴 처칠' },
  { index: 14, text: '한 번도 실수를 해본 적 없는 사람은 한 번도 새로운 것에 도전해 본 적 없는 사람이다.', author: '아인슈타인' },
  { index: 15, text: '지식은 힘이다.', author: '프랜시스 베이컨' },
  { index: 16, text: '변화를 두려워하는 사람은 아무것도 잃지 않지만, 아무것도 얻지도 못한다.', author: '헬렌 켈러' },
  { index: 17, text: '삶의 의미는 자신의 재능을 발견하는 것이고, 삶의 목적은 그것을 나누는 것이다.', author: '파블로 피카소' },
  { index: 18, text: '오늘 잘 살면 어제는 아름다운 꿈이 되고 내일은 희망찬 비전이 된다.', author: '인디언 속담' },
  { index: 19, text: '천 리 길도 한 걸음부터.', author: '노자' },
];

async function seed() {
  console.log('명언 데이터 업로드 시작...');
  const batch = db.batch();

  for (const quote of quotes) {
    const ref = db.collection('quotes').doc(`quote_${String(quote.index).padStart(2, '0')}`);
    batch.set(ref, quote);
  }

  await batch.commit();
  console.log(`✅ ${quotes.length}개 명언 업로드 완료!`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ 업로드 실패:', err);
  process.exit(1);
});
