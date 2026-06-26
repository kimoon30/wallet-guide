## 하네스: Markdown → HTML 문서 시각화

**목표:** Markdown 파일을 분석·보완하여 가독성 높은 독립형 HTML(리포트형 또는 PPT형)로 자동 변환한다.

**트리거:** Markdown 변환, HTML 생성, 문서 시각화, 리포트/발표자료 만들기 등의 요청 시 `md-to-html-orchestrator` 스킬을 사용하라. 단순 질문은 직접 응답 가능.

**변경 이력:**
| 날짜 | 변경 내용 | 대상 | 사유 |
|------|----------|------|------|
| 2026-06-26 | 초기 구성 | 전체 | prompt/001.harness.md 기반 신규 구축 |
| 2026-06-26 | 디자인 정책 shadcn으로 교체 + 외부 이미지·링크 수집 허용 | html-builder/SKILL.md, visualization-rules.md, content-enricher/SKILL.md | 사용자 요청 |
