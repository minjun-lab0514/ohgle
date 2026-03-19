/* global process */
// scripts/addQuotes.js
// 기존 20개(index 0~19)에 이어 80개(index 20~99)를 Firestore에 추가합니다.
// 사용법: node scripts/addQuotes.js

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const __dirname = dirname(fileURLToPath(import.meta.url));

const serviceAccount = require(join(__dirname, '..', 'serviceAccountKey.json'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const quotes = [
  // ── 철학 / 스토아 (20~29) ──────────────────────────────────────────────
  {
    index: 20,
    text: '새로운 바다를 발견하려면, 해안을 잃어버릴 용기가 있어야 한다.',
    author: '앙드레 지드',
    en: 'Man cannot discover new oceans unless he has the courage to lose sight of the shore.',
    author_en: 'André Gide',
  },
  {
    index: 21,
    text: '가장 흔한 절망의 형태는 자기 자신이 되지 못하는 것이다.',
    author: '쇠렌 키르케고르',
    en: 'The most common form of despair is not being who you are.',
    author_en: 'Søren Kierkegaard',
  },
  {
    index: 22,
    text: '주의를 기울이는 것은 가장 드물고 가장 순수한 형태의 관용이다.',
    author: '시몬 베유',
    en: 'Attention is the rarest and purest form of generosity.',
    author_en: 'Simone Weil',
  },
  {
    index: 23,
    text: '행동을 가로막는 장애물이 행동을 전진시킨다. 길을 막는 것이 곧 길이 된다.',
    author: '마르쿠스 아우렐리우스',
    en: 'The impediment to action advances action. What stands in the way becomes the way.',
    author_en: 'Marcus Aurelius',
  },
  {
    index: 24,
    text: '지혜로운 사람은 가지지 못한 것을 슬퍼하지 않고, 가진 것을 기뻐하는 사람이다.',
    author: '에픽테토스',
    en: 'He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.',
    author_en: 'Epictetus',
  },
  {
    index: 25,
    text: '인류의 모든 문제는 혼자 방 안에 조용히 앉아 있지 못하는 데서 비롯된다.',
    author: '블레즈 파스칼',
    en: "All of humanity's problems stem from man's inability to sit quietly in a room alone.",
    author_en: 'Blaise Pascal',
  },
  {
    index: 26,
    text: '우리는 현실보다 상상 속에서 더 많이 고통받는다.',
    author: '세네카',
    en: 'We suffer more in imagination than in reality.',
    author_en: 'Seneca',
  },
  {
    index: 27,
    text: '모든 사람은 인간 조건의 모든 형태를 자신 안에 품고 있다.',
    author: '미셸 드 몽테뉴',
    en: 'Every man carries the whole form of the human condition within him.',
    author_en: 'Michel de Montaigne',
  },
  {
    index: 28,
    text: '한겨울의 깊은 곳에서, 나는 마침내 내 안에 정복할 수 없는 여름이 있다는 것을 배웠다.',
    author: '알베르 카뮈',
    en: 'In the depth of winter, I finally learned that within me there lay an invincible summer.',
    author_en: 'Albert Camus',
  },
  {
    index: 29,
    text: '다른 사람의 삶에 가치를 부여하는 한, 자신의 삶도 가치가 있다.',
    author: '시몬 드 보부아르',
    en: "One's life has value so long as one attributes value to the life of others.",
    author_en: 'Simone de Beauvoir',
  },

  // ── 문학 / 시 (30~39) ────────────────────────────────────────────────────
  {
    index: 30,
    text: '나는 세상을 가로질러 넓어지는 원 속에서 삶을 살아간다.',
    author: '라이너 마리아 릴케',
    en: 'I live my life in widening circles that reach out across the world.',
    author_en: 'Rainer Maria Rilke',
  },
  {
    index: 31,
    text: '삶을 피함으로써 평화를 찾을 수는 없다.',
    author: '버지니아 울프',
    en: 'You cannot find peace by avoiding life.',
    author_en: 'Virginia Woolf',
  },
  {
    index: 32,
    text: '받아들여지는 것이 아니라 옳은 것에서 시작하라.',
    author: '프란츠 카프카',
    en: 'Start with what is right rather than what is acceptable.',
    author_en: 'Franz Kafka',
  },
  {
    index: 33,
    text: '인간 존재의 신비는 단지 살아남는 것이 아니라, 살아갈 이유를 찾는 것에 있다.',
    author: '표도르 도스토옙스키',
    en: 'The mystery of human existence lies not in just staying alive, but in finding something to live for.',
    author_en: 'Fyodor Dostoevsky',
  },
  {
    index: 34,
    text: '달이 빛난다고 말하지 마라. 깨진 유리 위에 반짝이는 빛을 보여다오.',
    author: '안톤 체호프',
    en: "Don't tell me the moon is shining; show me the glint of light on broken glass.",
    author_en: 'Anton Chekhov',
  },
  {
    index: 35,
    text: '시간은 무수한 미래를 향해 끊임없이 갈라진다.',
    author: '호르헤 루이스 보르헤스',
    en: 'Time forks perpetually toward innumerable futures.',
    author_en: 'Jorge Luis Borges',
  },
  {
    index: 36,
    text: '고전이란 결코 할 말을 다 하지 못한 책이다.',
    author: '이탈로 칼비노',
    en: 'A classic is a book that has never finished saying what it has to say.',
    author_en: 'Italo Calvino',
  },
  {
    index: 37,
    text: '진정한 발견의 여행은 새로운 풍경을 찾는 것이 아니라, 새로운 눈을 갖는 데 있다.',
    author: '마르셀 프루스트',
    en: 'The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.',
    author_en: 'Marcel Proust',
  },
  {
    index: 38,
    text: '창의적인 어른은 살아남은 아이다.',
    author: '어슐러 K. 르 귄',
    en: 'The creative adult is the child who survived.',
    author_en: 'Ursula K. Le Guin',
  },
  {
    index: 39,
    text: '나는 가능성 속에 산다.',
    author: '에밀리 디킨슨',
    en: 'I dwell in Possibility.',
    author_en: 'Emily Dickinson',
  },

  // ── 심리학 / 인간 본성 (40~49) ──────────────────────────────────────────
  {
    index: 40,
    text: '타인에게서 우리를 짜증나게 하는 모든 것은 우리 자신에 대한 이해로 이어질 수 있다.',
    author: '칼 융',
    en: 'Everything that irritates us about others can lead us to an understanding of ourselves.',
    author_en: 'Carl Jung',
  },
  {
    index: 41,
    text: '우리가 스스로에게 설정해야 할 과제는 안전함을 느끼는 것이 아니라, 불안정함을 견딜 수 있게 되는 것이다.',
    author: '에리히 프롬',
    en: 'The task we must set for ourselves is not to feel secure, but to be able to tolerate insecurity.',
    author_en: 'Erich Fromm',
  },
  {
    index: 42,
    text: '망치만 가지고 있다면, 모든 문제를 못으로 보게 된다.',
    author: '에이브러햄 매슬로',
    en: 'If you only have a hammer, you tend to see every problem as a nail.',
    author_en: 'Abraham Maslow',
  },
  {
    index: 43,
    text: '당신이 하는 일이 변화를 만든다고 믿고 행동하라. 실제로 그렇다.',
    author: '윌리엄 제임스',
    en: 'Act as if what you do makes a difference. It does.',
    author_en: 'William James',
  },
  {
    index: 44,
    text: '정상적인 사람이란 당신이 잘 모르는 사람들뿐이다.',
    author: '알프레트 아들러',
    en: "The only normal people are the ones you don't know very well.",
    author_en: 'Alfred Adler',
  },
  {
    index: 45,
    text: '역설적이게도, 있는 그대로의 나를 받아들일 때 비로소 변화할 수 있다.',
    author: '칼 로저스',
    en: 'The curious paradox is that when I accept myself just as I am, then I can change.',
    author_en: 'Carl Rogers',
  },
  {
    index: 46,
    text: '우리 사회에서 용기의 반대는 비겁함이 아니라 순응이다.',
    author: '롤로 메이',
    en: 'The opposite of courage in our society is not cowardice, it is conformity.',
    author_en: 'Rollo May',
  },
  {
    index: 47,
    text: '인간 존재의 사회적 정글에서, 정체성 없이 살아있음을 느낄 수는 없다.',
    author: '에릭 에릭슨',
    en: 'In the social jungle of human existence, there is no feeling of being alive without a sense of identity.',
    author_en: 'Erik Erikson',
  },
  {
    index: 48,
    text: '숨겨지는 것은 기쁨이고, 발견되지 않는 것은 재앙이다.',
    author: 'D.W. 위니컷',
    en: 'It is a joy to be hidden, and a disaster not to be found.',
    author_en: 'D.W. Winnicott',
  },
  {
    index: 49,
    text: '창조성은 확실성을 내려놓는 용기를 요구한다.',
    author: '에리히 프롬',
    en: 'Creativity requires the courage to let go of certainties.',
    author_en: 'Erich Fromm',
  },

  // ── 예술 / 음악 / 창조 (50~59) ──────────────────────────────────────────
  {
    index: 50,
    text: '예술은 보이는 것을 재현하지 않는다. 오히려 보이게 만든다.',
    author: '파울 클레',
    en: 'Art does not reproduce the visible; rather, it makes visible.',
    author_en: 'Paul Klee',
  },
  {
    index: 51,
    text: '예술을 생각할 때 나는 아름다움을 생각한다. 아름다움은 삶의 신비다. 눈에 있는 것이 아니라 마음에 있다.',
    author: '애그니스 마틴',
    en: 'When I think of art I think of beauty. Beauty is the mystery of life. It is not in the eye, it is in the mind.',
    author_en: 'Agnes Martin',
  },
  {
    index: 52,
    text: '그림은 경험을 그린 것이 아니라, 그 자체가 경험이다.',
    author: '마크 로스코',
    en: 'A painting is not a picture of an experience, but is the experience.',
    author_en: 'Mark Rothko',
  },
  {
    index: 53,
    text: '사람들이 왜 새로운 생각을 두려워하는지 이해할 수 없다. 나는 낡은 생각들이 두렵다.',
    author: '존 케이지',
    en: "I can't understand why people are frightened of new ideas. I'm frightened of the old ones.",
    author_en: 'John Cage',
  },
  {
    index: 54,
    text: '예술의 목적은 경이로움의 상태를 평생에 걸쳐 구축하는 것이다.',
    author: '글렌 굴드',
    en: 'The purpose of art is the lifelong construction of a state of wonder.',
    author_en: 'Glenn Gould',
  },
  {
    index: 55,
    text: '색과 형태로 다른 방식으로는 말할 수 없는 것들을 표현할 수 있다는 것을 깨달았다. 말로는 담을 수 없는 것들을.',
    author: '조지아 오키프',
    en: "I found I could say things with color and shapes that I couldn't say any other way – things I had no words for.",
    author_en: "Georgia O'Keeffe",
  },
  {
    index: 56,
    text: '춤추어라, 춤추어라, 그렇지 않으면 우리는 길을 잃는다.',
    author: '피나 바우쉬',
    en: 'Dance, dance, otherwise we are lost.',
    author_en: 'Pina Bausch',
  },
  {
    index: 57,
    text: '열망으로 타오르면서 그것을 침묵으로 감추는 것, 그것이 우리가 자신에게 내릴 수 있는 가장 큰 형벌이다.',
    author: '페데리코 가르시아 로르카',
    en: 'To burn with desire and keep quiet about it is the greatest punishment we can bring on ourselves.',
    author_en: 'Federico García Lorca',
  },
  {
    index: 58,
    text: '모든 꽃을 꺾을 수는 있지만, 봄이 오는 것을 막을 수는 없다.',
    author: '파블로 네루다',
    en: 'You can cut all the flowers, but you cannot keep spring from coming.',
    author_en: 'Pablo Neruda',
  },
  {
    index: 59,
    text: '우리 안에는 이름이 없는 무언가가 있다. 그 무언가가 바로 우리다.',
    author: '주제 사라마구',
    en: 'Inside us there is something that has no name, that something is what we are.',
    author_en: 'José Saramago',
  },

  // ── 과학 / 발견 (60~69) ──────────────────────────────────────────────────
  {
    index: 60,
    text: '첫 번째 원칙은 자신을 속이지 말아야 한다는 것이다. 그리고 당신은 속이기 가장 쉬운 사람이다.',
    author: '리처드 파인만',
    en: 'The first principle is that you must not fool yourself, and you are the easiest person to fool.',
    author_en: 'Richard Feynman',
  },
  {
    index: 61,
    text: '어딘가에, 알려지기를 기다리는 놀라운 무언가가 있다.',
    author: '칼 세이건',
    en: 'Somewhere, something incredible is waiting to be known.',
    author_en: 'Carl Sagan',
  },
  {
    index: 62,
    text: '삶에서 두려워할 것은 없다. 이해해야 할 것만 있을 뿐이다.',
    author: '마리 퀴리',
    en: 'Nothing in life is to be feared, it is only to be understood.',
    author_en: 'Marie Curie',
  },
  {
    index: 63,
    text: '현재는 그들의 것이다. 내가 진정으로 일했던 미래는 내 것이다.',
    author: '니콜라 테슬라',
    en: 'The present is theirs; the future, for which I really worked, is mine.',
    author_en: 'Nikola Tesla',
  },
  {
    index: 64,
    text: '음악은 우리를 우울에서 꺼내거나 눈물을 흘리게 한다. 그것은 치료제이자 강장제, 귀를 위한 오렌지 주스다.',
    author: '올리버 색스',
    en: 'Music can lift us out of depression or move us to tears – it is a remedy, a tonic, orange juice for the ear.',
    author_en: 'Oliver Sacks',
  },
  {
    index: 65,
    text: '기존 현실과 싸워서는 아무것도 바꿀 수 없다. 기존 모델을 쓸모없게 만드는 새로운 모델을 구축하라.',
    author: '버크민스터 풀러',
    en: 'You never change things by fighting the existing reality. To change something, build a new model that makes the existing model obsolete.',
    author_en: 'Buckminster Fuller',
  },
  {
    index: 66,
    text: '우리가 관찰하는 것은 자연 그 자체가 아니라, 우리의 질문 방식에 노출된 자연이다.',
    author: '베르너 하이젠베르크',
    en: 'What we observe is not nature itself, but nature exposed to our method of questioning.',
    author_en: 'Werner Heisenberg',
  },
  {
    index: 67,
    text: '과제는 아무도 보지 못한 것을 보는 것이 아니라, 누구나 보는 것에 대해 아무도 생각하지 않은 것을 생각하는 것이다.',
    author: '에르빈 슈뢰딩거',
    en: 'The task is not so much to see what no one has yet seen, but to think what nobody has yet thought, about that which everybody sees.',
    author_en: 'Erwin Schrödinger',
  },
  {
    index: 68,
    text: '때로는 아무도 기대하지 않는 사람들이 아무도 상상하지 못한 일을 해낸다.',
    author: '앨런 튜링',
    en: 'Sometimes it is the people no one imagines anything of who do the things that no one can imagine.',
    author_en: 'Alan Turing',
  },
  {
    index: 69,
    text: '대지의 아름다움을 바라보는 사람들은 삶이 지속되는 한 지속될 힘의 원천을 발견한다.',
    author: '레이첼 카슨',
    en: 'Those who contemplate the beauty of the earth find reserves of strength that will endure as long as life lasts.',
    author_en: 'Rachel Carson',
  },

  // ── 동양 사상 / 명상 (70~79) ─────────────────────────────────────────────
  {
    index: 70,
    text: '고요한 마음 앞에서 온 우주가 굴복한다.',
    author: '장자',
    en: 'To a mind that is still, the whole universe surrenders.',
    author_en: 'Zhuangzi',
  },
  {
    index: 71,
    text: '자아를 공부한다는 것은 자아를 잊는 것이다.',
    author: '도겐',
    en: 'To study the self is to forget the self.',
    author_en: 'Dogen',
  },
  {
    index: 72,
    text: '절의 종소리는 멈추었지만, 나는 아직도 꽃들 속에서 흘러나오는 소리를 듣는다.',
    author: '마쓰오 바쇼',
    en: 'The temple bell stops but I still hear the sound coming out of the flowers.',
    author_en: 'Matsuo Bashō',
  },
  {
    index: 73,
    text: '깨달음 이전에는 나무를 패고 물을 긷는다. 깨달음 이후에도 나무를 패고 물을 긷는다.',
    author: '선(禪) 격언',
    en: 'Before enlightenment, chop wood, carry water. After enlightenment, chop wood, carry water.',
    author_en: 'Zen Proverb',
  },
  {
    index: 74,
    text: '어제는 영리했기에 세상을 바꾸고 싶었다. 오늘은 지혜로워졌기에 나 자신을 바꾸고 있다.',
    author: '루미',
    en: 'Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.',
    author_en: 'Rumi',
  },
  {
    index: 75,
    text: '타인을 아는 것은 지식이고, 자신을 아는 것은 진정한 지혜이다. 타인을 지배하는 것은 힘이고, 자신을 지배하는 것은 진정한 권력이다.',
    author: '노자',
    en: 'Knowing others is intelligence; knowing yourself is true wisdom. Mastering others is strength; mastering yourself is true power.',
    author_en: 'Laozi',
  },
  {
    index: 76,
    text: '현재 순간은 우리에게 주어진 유일한 순간이며, 모든 순간으로 이어지는 문이다.',
    author: '틱낫한',
    en: 'The present moment is the only moment available to us, and it is the door to all moments.',
    author_en: 'Thich Nhat Hanh',
  },
  {
    index: 77,
    text: '해결할 수 있는 문제라면 걱정할 필요가 없다. 해결할 수 없는 문제라면 걱정해도 도움이 되지 않는다.',
    author: '달라이 라마',
    en: "If a problem is fixable, then there is no need to worry. If it's not fixable, then there is no help in worrying.",
    author_en: 'Dalai Lama',
  },
  {
    index: 78,
    text: '나는 나비가 된 꿈을 꾸었다. 지금 나는 내가 나비가 되는 꿈을 꾼 사람인지, 아니면 사람이 되는 꿈을 꾸고 있는 나비인지 모른다.',
    author: '장자',
    en: 'Once upon a time, I dreamt I was a butterfly. Now I do not know whether I was then a man dreaming I was a butterfly, or whether I am now a butterfly dreaming I am a man.',
    author_en: 'Zhuangzi',
  },
  {
    index: 79,
    text: '나무를 심기 가장 좋은 때는 20년 전이었다. 두 번째로 좋은 때는 지금이다.',
    author: '중국 속담',
    en: 'The best time to plant a tree was twenty years ago. The second best time is now.',
    author_en: 'Chinese Proverb',
  },

  // ── 현대 작가 / 사상가 (80~89) ───────────────────────────────────────────
  {
    index: 80,
    text: '직면한다고 모든 것이 바뀌는 것은 아니다. 하지만 직면하지 않으면 아무것도 바뀌지 않는다.',
    author: '제임스 볼드윈',
    en: 'Not everything that is faced can be changed, but nothing can be changed until it is faced.',
    author_en: 'James Baldwin',
  },
  {
    index: 81,
    text: '힘을 가졌다면, 당신의 역할은 다른 누군가에게 힘을 주는 것이다.',
    author: '토니 모리슨',
    en: 'If you have some power, then your job is to empower somebody else.',
    author_en: 'Toni Morrison',
  },
  {
    index: 82,
    text: '행복이 고칠 수 없는 것은 어떤 약도 고칠 수 없다.',
    author: '가브리엘 가르시아 마르케스',
    en: 'No medicine cures what happiness cannot.',
    author_en: 'Gabriel García Márquez',
  },
  {
    index: 83,
    text: '단 하나의 이야기는 고정관념을 만들어낸다. 고정관념의 문제는 그것이 틀렸다는 것이 아니라, 불완전하다는 것이다.',
    author: '치마만다 응고지 아디치에',
    en: 'The single story creates stereotypes, and the problem with stereotypes is not that they are untrue, but that they are incomplete.',
    author_en: 'Chimamanda Ngozi Adichie',
  },
  {
    index: 84,
    text: '다른 사람들이 읽는 책만 읽는다면, 다른 사람들이 생각하는 것만 생각할 수 있다.',
    author: '무라카미 하루키',
    en: 'If you only read the books that everyone else is reading, you can only think what everyone else is thinking.',
    author_en: 'Haruki Murakami',
  },
  {
    index: 85,
    text: '진정한 영웅은 항상 실수로 영웅이 된다. 그는 다른 모두처럼 정직한 겁쟁이가 되기를 꿈꾼다.',
    author: '움베르토 에코',
    en: 'The real hero is always a hero by mistake; he dreams of being an honest coward like everybody else.',
    author_en: 'Umberto Eco',
  },
  {
    index: 86,
    text: '나는 누군가의 생명을 구하려는 듯이 쓴다. 아마도 나 자신의.',
    author: '클라리스 리스펙토르',
    en: "I write as if to save somebody's life. Probably my own.",
    author_en: 'Clarice Lispector',
  },
  {
    index: 87,
    text: '오늘 당신의 삶을 바꾸어라. 미래에 도박을 걸지 말고, 지금 당장, 망설임 없이 행동하라.',
    author: '시몬 드 보부아르',
    en: "Change your life today. Don't gamble on the future, act now, without delay.",
    author_en: 'Simone de Beauvoir',
  },
  {
    index: 88,
    text: '고독은 인간 조건의 가장 심오한 사실이다. 인간은 자신이 혼자임을 아는 유일한 존재다.',
    author: '옥타비오 파스',
    en: 'Solitude is the profoundest fact of the human condition. Man is the only being who knows he is alone.',
    author_en: 'Octavio Paz',
  },
  {
    index: 89,
    text: '우리가 이야기를 통제하면, 우리는 자신을 통제한다.',
    author: '치누아 아체베',
    en: 'When we control narrative, we control ourselves.',
    author_en: 'Chinua Achebe',
  },

  // ── 영화 / 연극 / 문화 (90~99) ───────────────────────────────────────────
  {
    index: 90,
    text: '영화처럼 일상적 의식을 넘어 우리의 감정으로 곧장, 영혼의 어스름한 방 깊숙이 들어가는 예술 형식은 없다.',
    author: '잉마르 베리만',
    en: 'No form of art goes beyond ordinary consciousness as film does, straight to our emotions, deep into the twilight room of the soul.',
    author_en: 'Ingmar Bergman',
  },
  {
    index: 91,
    text: '예술가는 세상이 완벽하지 않기 때문에 존재한다.',
    author: '안드레이 타르코프스키',
    en: 'The artist exists because the world is not perfect.',
    author_en: 'Andrei Tarkovsky',
  },
  {
    index: 92,
    text: '다른 언어는 삶에 대한 다른 시각이다.',
    author: '페데리코 펠리니',
    en: 'A different language is a different vision of life.',
    author_en: 'Federico Fellini',
  },
  {
    index: 93,
    text: '미친 세상에서는 미친 자만이 제정신이다.',
    author: '구로사와 아키라',
    en: 'In a mad world, only the mad are sane.',
    author_en: 'Akira Kurosawa',
  },
  {
    index: 94,
    text: '어둠이 아무리 광대하더라도, 우리는 스스로 빛을 밝혀야 한다.',
    author: '스탠리 큐브릭',
    en: 'However vast the darkness, we must supply our own light.',
    author_en: 'Stanley Kubrick',
  },
  {
    index: 95,
    text: '예술은 현실을 비추는 거울이 아니라, 현실을 형성하는 망치다.',
    author: '베르톨트 브레히트',
    en: 'Art is not a mirror held up to reality, but a hammer with which to shape it.',
    author_en: 'Bertolt Brecht',
  },
  {
    index: 96,
    text: '어떤 멍청이든 위기는 감당할 수 있다. 당신을 지치게 하는 것은 매일매일의 삶이다.',
    author: '안톤 체호프',
    en: "Any idiot can face a crisis; it's the day-to-day living that wears you out.",
    author_en: 'Anton Chekhov',
  },
  {
    index: 97,
    text: '다시 시도하라. 다시 실패하라. 더 잘 실패하라.',
    author: '사뮈엘 베케트',
    en: 'Try again. Fail again. Fail better.',
    author_en: 'Samuel Beckett',
  },
  {
    index: 98,
    text: '정의한다는 것은 한계를 짓는 것이다.',
    author: '오스카 와일드',
    en: 'To define is to limit.',
    author_en: 'Oscar Wilde',
  },
  {
    index: 99,
    text: '기만의 시대에, 진실을 말하는 것은 혁명적인 행위다.',
    author: '조지 오웰',
    en: 'In a time of deceit, telling the truth is a revolutionary act.',
    author_en: 'George Orwell',
  },
];

async function addQuotes() {
  console.log(`명언 ${quotes.length}개 추가 시작...`);

  // Firestore는 batch당 최대 500개 허용 — 80개는 단일 batch로 처리 가능
  const batch = db.batch();

  for (const quote of quotes) {
    const ref = db.collection('quotes').doc(`quote_${String(quote.index).padStart(2, '0')}`);
    batch.set(ref, quote);
  }

  await batch.commit();
  console.log(`✅ ${quotes.length}개 명언 추가 완료! (index 20~99)`);
  process.exit(0);
}

addQuotes().catch((err) => {
  console.error('❌ 추가 실패:', err);
  process.exit(1);
});
