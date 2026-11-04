# 밍티의 AI 교실

밍티와 함께하는 Orange3 인공지능 수업 학습지 모음입니다.

- 첫 화면: https://gus-wn.github.io/orange3_mintea/

## 학습지

1. **개인에 관한 신상정보로 소득 정도를 예측할 수 있을까?** (`worksheet.html`)
   Kaggle「Korea Income and Welfare」데이터를 Orange3로 탐색하고 회귀 모델(Linear Regression, kNN, Random Forest)로 소득을 예측합니다.
   빈칸·선택 문항 자동 채점, 서술형 문항, PDF 내려받기를 지원합니다.

2. **태아의 건강 상태를 미리 알 수 있을까?** (`worksheet2.html`)
   Kaggle「Fetal Health Classification」데이터로 태아 건강 상태(정상·주의·나쁨)를 분류합니다. Distributions, Scatter Plot, Rank, 분류 모델 5가지, Confusion Matrix를 다룹니다.

3. **나만의 데이터로 인공지능 모델 만들기** (`worksheet3.html`, 수행평가 보고서)
   학생이 캐글 데이터를 골라 Orange3로 분석한 과정을 정리해 PDF로 제출합니다. 공개 여부는 `config.json`의 `published.worksheet3`로 정하며, 선생님 화면의 공개 버튼으로 바꿉니다.

4. **『도덕적인 AI』 찬반 토론** (선생님 전용 `debate.html`, 학생용 투표함 `vote.html`)
   Padlet 독서토론에서 고른 주제 4개(안전·프라이버시·공정성·책임)의 찬반 논거와 1:1 토론 순서 타이머입니다. 학생은 `vote.html`에서 원하는 주제·입장을 투표하고, 결과는 구글 시트(`apps-script/vote.gs`)에 쌓입니다. 학생 첫 화면의 '토론' 칸(수행 아래)은 늘 보이고, 투표를 받을지는 `config.json`의 `published.vote`, 시트 주소는 `voteUrl`로 정하며 선생님 화면에서 바꿉니다. 논제 문장을 고치면 `debate.html`과 `vote.html` 두 곳을 함께 고쳐야 합니다(학생 화면에 논거가 새지 않도록 따로 둠).

## 파일

- `index.html` 첫 화면 (학습지 목록)
- `worksheet.html` 학습지 1
- `teacher.html` 선생님 화면, `editor.html` 학습지 편집기, `key.html` 예시 답안 보기·고치기 (답안 내용은 `answers/`)
- `lesson.html` 교사용 수업 자료 (첫 화면에는 연결하지 않음)
- `img/` 오렌지3·캐글 화면 캡처, 밍티 도트 이미지
- `fonts/` 갈무리11 (SIL Open Font License 1.1, https://galmuri.quiple.dev)

밍티 캐릭터 © gus-wn

### 글꼴 라이선스
- `fonts/BMKkubulim.woff2` 꾸불림체 (배달의민족 무료 글꼴, KS X 1001 한글 2,350자 등으로 줄인 웹용 파일). 영리·비영리 목적으로 자유롭게 사용·수정할 수 있으며 글꼴 파일 자체의 유상 판매는 금지됩니다. https://www.woowahan.com/fonts
- `fonts/ChosunilboMyungjo.woff` 조선일보명조
