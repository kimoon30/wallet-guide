---
name: html-validator
description: 생성된 HTML의 내용 완전성·접근성·반응형·출처를 검증하는 스킬. html-validator 에이전트가 사용.
---

# HTML 검증 스킬

## 검증 절차

### Step 1: 내용 완전성 체크

원본 Markdown의 섹션 목록을 추출하고 HTML과 1:1 대조한다.

- H1~H4 제목이 모두 HTML에 존재하는가?
- 표가 모두 반영되었는가 (행·열 수 일치)?
- 코드 블록이 누락되지 않았는가?
- `01_analysis.json`의 `key_messages`가 모두 본문에 있는가?

**판정:** 누락 1개라도 → critical

### Step 2: 근거 없는 추가 확인

HTML 본문에서 `02_enriched.json`에 없는 내용을 탐지한다.

- `enrichments[].added_content`에 없는 새 문장이 주장 형태로 나타나는가?
- 출처 없는 수치·퍼센트가 새로 등장하는가?

**판정:** 발견 시 → critical

### Step 3: 가독성 체크

- `<section>` 또는 `<div>` 단위로 텍스트 추출, 500단어 초과 여부 확인
- 연속 `<li>` 항목 7개 이상 여부 확인

**판정:** 초과 시 → warning

### Step 4: 반응형 체크

HTML 내 CSS를 분석한다:
- `min-width`·`width` 고정값이 375px 이상인 요소 탐지
- `<table>` 래퍼에 `overflow-x: auto` 없음 여부
- `viewport` meta 태그 존재 여부: `<meta name="viewport" content="width=device-width, initial-scale=1">`

**판정:** viewport 없음 → critical, 표 래퍼 없음 → warning

### Step 5: 접근성 체크

- `<img>` 태그 중 `alt` 속성 없거나 빈 것 탐지
- 헤딩 계층 오류 탐지 (H2 없이 H3 등장 등)
- `lang` 속성: `<html lang="ko">` 또는 적절한 언어 코드

**판정:** alt 없음 → warning, 헤딩 오류 → warning, lang 없음 → warning

### Step 6: 출처 표시 체크

- `02_enriched.json`의 모든 `enrichments`에 대응하는 출처 표시가 HTML에 있는가?
- 조회일(retrieved_date)이 표시되었는가?

**판정:** 출처 없음 → warning

## 재작업 요청

critical 이슈 발견 시 `SendMessage`로 **html-builder**에게:

```
"재작업 필요. critical 이슈 {N}개: [이슈 목록]. 파일: _workspace/04_qa_report.json 참조."
```

최대 2회. 2회 후에도 critical 잔존 시 오케스트레이터에 보고하고 사용자 판단을 기다린다.

## 출력

`_workspace/04_qa_report.json` 저장 후 `SendMessage`로 **오케스트레이터**에게:

```
"QA 완료. pass: {true|false}. 이슈: critical {N}개, warning {M}개. 파일: _workspace/04_qa_report.json."
```
