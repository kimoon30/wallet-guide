---
name: html-builder
description: 분석·보완 결과를 바탕으로 shadcn 스타일 HTML을 생성하는 스킬. html-builder 에이전트가 사용.
---

# HTML 빌드 스킬

상세 시각화 규칙: `references/visualization-rules.md`

## 1. 레이아웃 확정

`01_analysis.json`의 `layout_recommendation` 읽기:
- `report` → 리포트형 생성
- `ppt` → PPT형 생성
- 불명확 → 리포트형 기본값, `03_build_log.json`에 "기본값 선택" 기록

## 2. 외부 리소스 정책 (변경됨)

**허용:**
- Tailwind CSS CDN (`https://cdn.tailwindcss.com`) — shadcn 스타일 구현용
- `02_enriched.json`의 `external_images` 배열에 있는 이미지 URL → `<img>` 태그로 임베드
- `02_enriched.json`의 `external_links` 배열에 있는 링크 → `<a target="_blank" rel="noopener">` 처리
- 섹션 관련 이미지가 있으면 콘텐츠 상단 또는 우측에 배치

**필수 처리:**
- 외부 이미지는 반드시 `alt` 속성 포함
- 이미지 로드 실패 대비 `onerror` 핸들러 또는 fallback 텍스트 추가
- 외부 링크 도메인을 `[출처: domain.com]` 형태로 캡션에 명시

**금지:**
- `02_enriched.json`에 없는 외부 이미지·스크립트 임의 삽입 금지
- 인라인 스크립트 중 외부 API 호출 금지

## 3. HTML 헤드 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{문서 제목}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            border: "hsl(240 5.9% 90%)",
            input: "hsl(240 5.9% 90%)",
            ring: "hsl(240 5.9% 10%)",
            background: "hsl(0 0% 100%)",
            foreground: "hsl(240 10% 3.9%)",
            primary: { DEFAULT: "hsl(240 5.9% 10%)", foreground: "hsl(0 0% 98%)" },
            muted: { DEFAULT: "hsl(240 4.8% 95.9%)", foreground: "hsl(240 3.8% 46.1%)" },
            accent: { DEFAULT: "hsl(240 4.8% 95.9%)", foreground: "hsl(240 5.9% 10%)" },
            card: { DEFAULT: "hsl(0 0% 100%)", foreground: "hsl(240 10% 3.9%)" },
          }
        }
      }
    }
  </script>
  <style>
    /* shadcn 전역 CSS 변수 + 커스텀 컴포넌트 */
    /* references/visualization-rules.md 참조 */
  </style>
</head>
```

## 4. 콘텐츠 재구성

원본 Markdown을 HTML로 변환할 때:

- **500단어 초과 문단** → shadcn Card 컴포넌트로 분리
- **7개 이상 연속 글머리 기호** → 그룹화하거나 표로 전환
- **과도한 코드 블록** → `<details>` 태그로 접기
- **보완 내용** → shadcn Badge + 노란 배경 구분
- **외부 이미지** → 섹션 상단 또는 우측에 rounded 이미지로 배치

## 5. 보완 내용 표시 방식

```html
<div class="enriched-note">
  <span class="badge-enriched">보완</span>
  내용 텍스트
  <cite class="text-xs text-muted-foreground ml-2">[출처: 기관명]</cite>
</div>
```

shadcn 스타일 CSS:
```css
.enriched-note {
  background: hsl(48 100% 97%);
  border-left: 3px solid hsl(38 92% 50%);
  padding: 0.75rem 1rem;
  border-radius: 0 0.375rem 0.375rem 0;
  margin: 1rem 0;
}
.badge-enriched {
  display: inline-flex; align-items: center;
  background: hsl(38 92% 50%); color: white;
  font-size: 0.7rem; font-weight: 600;
  padding: 0.1rem 0.5rem; border-radius: 9999px;
  margin-right: 0.5rem;
}
```

## 6. 리포트형 shadcn 컴포넌트 패턴

- **TOC**: 좌측 sticky `<nav>` — `border-r` + `bg-background` + `text-sm`
- **섹션**: `<section>` + `py-8 border-b border-border`
- **카드**: `rounded-lg border border-border bg-card p-6 shadow-sm`
- **표**: shadcn Table 패턴 — `border border-border rounded-md overflow-hidden`
- **배지**: `inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold`
- **이미지**: `rounded-lg border border-border object-cover`

## 7. PPT형 필수 요소

```html
<div class="slide-container">
  <div class="slide" id="slide-1">...</div>
</div>
<div class="progress-bar"></div>
```

키보드 이벤트(←→), 슬라이드 번호, 진행 바 — 인라인 `<script>`로 구현.

## 출력

- `output/{원본파일명}.html`
- `_workspace/03_build_log.json`:

```json
{
  "layout": "report|ppt",
  "layout_reason": "...",
  "external_images_embedded": 0,
  "external_links_embedded": 0,
  "sections_processed": [
    {"heading": "...", "action": "그대로|카드화|표전환", "note": "..."}
  ],
  "enriched_count": 0,
  "unanswered_gap_count": 0
}
```

완료 후 `SendMessage`로 **html-validator**에게:
```
"빌드 완료. 파일: output/{이름}.html. 레이아웃: {report|ppt}."
```
