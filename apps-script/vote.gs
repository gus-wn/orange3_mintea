/**
 * 밍티의 AI 교실 · 토론 주제 투표함 (구글 시트 + Apps Script)
 *
 * 설치 방법 (한 번만)
 * 1. 구글 드라이브에서 새 스프레드시트를 만듭니다. (예: "도덕적인 AI 토론 투표")
 * 2. 메뉴 [확장 프로그램] → [Apps Script]를 열고, 기본 코드를 지운 뒤 이 파일 내용을 붙여 넣고 저장합니다.
 * 3. 오른쪽 위 [배포] → [새 배포] → 유형 '웹 앱'
 *      - 다음 사용자 인증 정보로 실행: 나
 *      - 액세스 권한이 있는 사용자: 모든 사용자
 *    [배포]를 누르고 권한을 허용한 뒤, 나오는 '웹 앱 URL'(https://script.google.com/macros/s/.../exec)을 복사합니다.
 * 4. 선생님 화면 → 토론 → '투표함 연결'에 그 주소를 붙여 넣고 저장합니다.
 *
 * 투표는 '투표' 시트에 한 줄씩 쌓입니다. 다시 하려면 시트의 2행부터 지우면 됩니다.
 * 코드를 고친 뒤에는 [배포] → [배포 관리] → 연필 → 버전 '새 버전'으로 다시 배포해야 반영됩니다.
 */

const SHEET_NAME = '투표';
const SIDES = ['찬성', '반대', '상관없음'];

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) {
    sh = ss.insertSheet(SHEET_NAME);
    sh.appendRow(['시간', '이름', '1지망 주제', '1지망 입장', '2지망 주제', '2지망 입장']);
    sh.setFrozenRows(1);
  }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

const topicOk_ = t => [1, 2, 3, 4].indexOf(Number(t)) >= 0;
const side_ = s => (SIDES.indexOf(s) >= 0 ? s : '상관없음');

// 학생 투표 받기
function doPost(e) {
  let d = {};
  try { d = JSON.parse((e && e.postData && e.postData.contents) || '{}'); } catch (err) { return out_({ ok: false, error: 'bad-json' }); }
  const name = String(d.name || '').replace(/\s+/g, ' ').trim().slice(0, 30);
  if (!name) return out_({ ok: false, error: 'name' });
  if (!topicOk_(d.first)) return out_({ ok: false, error: 'topic' });
  const hasSecond = topicOk_(d.second) && Number(d.second) !== Number(d.first);

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    sheet_().appendRow([
      new Date(), name,
      Number(d.first), side_(d.firstSide),
      hasSecond ? Number(d.second) : '', hasSecond ? side_(d.secondSide) : ''
    ]);
  } finally {
    lock.releaseLock();
  }
  return out_({ ok: true });
}

// 선생님 토론 화면에서 결과 읽기
function doGet() {
  const rows = sheet_().getDataRange().getValues().slice(1).filter(r => r[1] !== '');
  return out_({
    ok: true,
    votes: rows.map(r => ({
      time: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
      name: String(r[1]),
      first: r[2], firstSide: r[3],
      second: r[4], secondSide: r[5]
    }))
  });
}
