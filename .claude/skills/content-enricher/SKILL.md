---
name: content-enricher
description: md-analyzer가 식별한 갭을 웹 검색으로 보완하고, 섹션별 관련 외부 이미지·링크를 수집하는 스킬. content-enricher 에이전트가 사용.
---

# 콘텐츠 보완 스킬

## 1. 갭 우선순위 결정

`01_analysis.json`의 `gaps` 배열을 읽고 다음 순서로 처리한다:

1. **핵심 주장 관련 갭** (근거없음, 비교기준없음) — 문서 신뢰도에 직접 영향
2. **수치·통계 출처** (출처불명) — 사실 정확성에 영향
3. **전문 용어 정의** (정의없음) — 독자 이해에 영향
4. **이미지 alt** (alt없음) — 접근성에 영향, html-builder에서 처리 가능

## 2. 검색 전략

각 갭 유형별 검색 방향:

| 갭 유형 | 검색 목표 | 우선 출처 |
|--------|----------|----------|
| 근거없음 | 주장을 뒷받침하는 근거·연구 | 학술 논문, 공식 보고서 |
| 출처불명 | 수치의 원출처 확인 | 통계청, 공식 기관 데이터 |
| 정의없음 | 용어의 표준 정의 | 공식 문서, 표준 기관 |
| 비교기준없음 | 비교를 위한 맥락·기준 | 업계 표준, 벤치마크 |

## 3. 외부 이미지·링크 수집 (신규)

갭 보완과 별도로, 각 섹션의 이해를 돕는 **외부 이미지와 참고 링크**를 수집한다.

### 수집 대상

| 대상 유형 | 수집 기준 | 우선순위 |
|----------|----------|---------|
| 서비스 로고·스크린샷 | 공식 사이트 또는 위키미디어 공용 이미지 | 높음 |
| 개념 설명 다이어그램 | Creative Commons 또는 공개 라이선스 이미지 | 중간 |
| 공식 문서·레퍼런스 링크 | 서비스 공식 도메인 (metamask.io, phantom.com 등) | 높음 |
| 신뢰 언론 기사 | 주요 블록체인·금융 미디어 (CoinDesk, Blockworks 등) | 중간 |

### 수집 원칙

- **공식 출처 우선**: 공식 사이트의 이미지·링크를 최우선으로 수집한다.
- **라이선스 확인**: 이미지는 공개 사용 가능한 URL만 수집한다 (저작권 불명확 이미지 제외).
- **섹션 연관성**: 수집한 이미지는 반드시 관련 섹션 ID를 함께 기록한다.
- **개수 제한**: 섹션당 이미지 최대 2개, 링크 최대 3개.
- **broken URL 방지**: URL이 실제로 접근 가능한지 확인하고, 불확실하면 수집하지 않는다.

### 수집 방법

웹 검색으로 각 서비스·개념의 공식 이미지 URL을 찾는다:
- 검색어 예: `"{서비스명} logo official site:metamask.io"`
- Wikipedia / Wikimedia Commons 공용 이미지 활용 가능
- 원본 MD의 출처 목록에 있는 URL에서 이미지 링크를 추출하는 것도 허용

## 4. 보완 원칙

- **원문 맥락 유지**: 원본의 주장 방향을 바꾸지 않는다.
- **최소 보완**: 갭을 채우는 데 필요한 최소 내용만 추가한다.
- **원본/보완 구분**: 보완 내용임을 `added_content` 필드에 명시, HTML에서 시각 구분.
- **불확실 금지**: 확인되지 않은 내용은 절대 `confidence: "확인됨"`으로 표시하지 않는다.

## 5. 출처 기록 형식

모든 보완 내용에 다음을 기록한다:
```json
{
  "url": "https://...",
  "org": "기관명 또는 저자",
  "retrieved_date": "YYYY-MM-DD"
}
```

날짜는 오늘 날짜(조회일)로 기록한다.

## 6. 미보완 처리

다음 경우 보완하지 않고 `unanswered_gaps`에 추가한다:
- 검색 결과가 없거나 신뢰도 낮음
- 출처가 불명확한 검색 결과만 존재
- 내용이 너무 전문적이어서 일반 출처로 확인 불가

## 출력 스키마

`_workspace/02_enriched.json`에 저장:

```json
{
  "enriched_gaps": [
    {
      "gap_id": "gap-1",
      "status": "resolved | partial | unresolved",
      "enriched_content": "보완된 내용 (마크다운)",
      "source": { "url": "...", "org": "...", "retrieved_date": "YYYY-MM-DD" },
      "confidence": "high | medium | low"
    }
  ],
  "external_images": [
    {
      "section_id": "B-1",
      "url": "https://...",
      "alt": "MetaMask 공식 로고",
      "caption": "출처: metamask.io",
      "placement": "header | inline | float-right"
    }
  ],
  "external_links": [
    {
      "section_id": "B-1",
      "url": "https://...",
      "label": "MetaMask 공식 문서",
      "domain": "metamask.io"
    }
  ],
  "unanswered_gaps": [],
  "additional_notes": "보완 과정 메모",
  "ready_for_build": true
}
```

완료 후 `SendMessage`로 **html-builder**에게:
```
"보완 완료. 파일: _workspace/02_enriched.json. 보완 {N}개, 이미지 {I}개, 링크 {L}개, 미보완 {M}개."
```
