---
name: md-to-html-orchestrator
description: Markdown 파일을 분석·보완하여 가독성 높은 HTML로 변환하는 전체 파이프라인을 조율한다. "마크다운 변환", "MD를 HTML로", "리포트 만들어줘", "발표자료 만들어줘", "문서 시각화", "HTML 생성", ".md 파일 변환", "다시 변환", "재실행", "HTML 업데이트", "결과 개선" 등의 요청 시 반드시 이 스킬을 사용할 것. .md 파일을 언급하며 HTML·문서 출력을 요청하면 이 스킬을 사용하라.
---

# MD→HTML 오케스트레이터

**실행 모드:** 에이전트 팀 (파이프라인 패턴)

---

## Phase 0: 컨텍스트 확인

작업 시작 전 기존 산출물 여부를 확인한다.

| 상태 | 실행 모드 |
|------|----------|
| `_workspace/` 없음 | **초기 실행** — Phase 1부터 전체 실행 |
| `_workspace/` 있음 + 부분 수정 요청 | **부분 재실행** — 해당 에이전트만 재호출 |
| `_workspace/` 있음 + 새 입력 제공 | **새 실행** — `_workspace/`를 `_workspace_prev/`로 이동 후 전체 실행 |

## Phase 1: 초기화 및 분석

1. `_workspace/` 디렉터리 생성.
2. `output/` 디렉터리 생성.
3. 입력 Markdown 파일 경로 확인 (없으면 사용자에게 요청).
4. **md-analyzer** 에이전트 호출, Markdown 파일 경로 전달.
5. `_workspace/01_analysis.json` 생성 확인 대기.

## Phase 2: 콘텐츠 보완

1. md-analyzer 완료 신호(SendMessage) 수신.
2. `_workspace/01_analysis.json` 존재 확인.
3. **content-enricher** 에이전트 호출, 분석 결과 전달.
4. `_workspace/02_enriched.json` 생성 확인 대기.

## Phase 3: HTML 생성

1. content-enricher 완료 신호 수신.
2. `_workspace/02_enriched.json` 존재 확인.
3. **html-builder** 에이전트 호출, 원본 MD + 분석 + 보완 파일 경로 전달.
4. `output/{이름}.html` 생성 확인 대기.

## Phase 4: 품질 검증

1. html-builder 완료 신호 수신.
2. `output/` 내 HTML 파일 존재 확인.
3. **html-validator** 에이전트 호출, HTML + 원본 MD + 보완 파일 경로 전달.
4. `_workspace/04_qa_report.json` 생성 확인 대기.

## Phase 5: 완료 보고

1. html-validator 완료 신호 수신.
2. `_workspace/04_qa_report.json` 읽기.
3. 사용자에게 보고:
   - 최종 HTML 파일 경로
   - QA 결과 요약 (pass 여부, 주요 이슈)
   - 레이아웃 선택 결과 (report/ppt) 및 선택 이유
   - 미보완 갭 목록 (있을 경우)
4. 피드백 수렴 — "개선할 부분이 있나요?" 질문.

---

## 데이터 흐름

```
Markdown 파일 (입력)
        ↓
[md-analyzer] ──→ _workspace/01_analysis.json
        ↓
[content-enricher] ──→ _workspace/02_enriched.json
        ↓
[html-builder] ──→ output/{이름}.html
                   _workspace/03_build_log.json
        ↓
[html-validator] ──→ _workspace/04_qa_report.json
        ↓
사용자 보고
```

## 에러 핸들링

| 에러 | 처리 |
|------|------|
| 에이전트 작업 실패 | 1회 재시도 → 재실패 시 해당 단계 건너뛰고 보고서에 누락 명시 |
| critical QA 이슈 | html-builder 재작업 요청 (최대 2회) |
| 파일 경로 오류 | 오케스트레이터가 경로 재확인 후 에이전트에 재전달 |
| MD 파일 없음 | Phase 1에서 즉시 중단, 사용자에게 경로 재요청 |

---

## 테스트 시나리오

### 정상 흐름
1. `test.md` (섹션 3개, 표 1개, 코드 블록 1개) 입력.
2. md-analyzer → 리포트형 추천, 갭 2개 식별.
3. content-enricher → 갭 1개 보완(출처 포함), 1개 "추가 확인 필요".
4. html-builder → `output/test.html` 생성 (리포트형).
5. html-validator → pass: true, warning 1개(이미지 alt 없음).
6. 사용자에게 경로 + QA 요약 보고.

### 에러 흐름
1. 존재하지 않는 파일 경로 입력 → md-analyzer 오류 감지 → 오케스트레이터가 사용자에게 파일 경로 재확인 요청.
2. content-enricher 검색 실패 → 갭 "추가 확인 필요" 처리 후 계속 진행 → 최종 보고서에 미보완 갭 명시.
