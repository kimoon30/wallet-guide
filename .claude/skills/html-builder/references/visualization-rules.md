# 시각화 규칙 — shadcn 디자인 시스템

## CSS 변수 (전역 선언)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 240 5.9% 10%;
  --radius: 0.5rem;
}
```

## 타이포그래피

| 요소 | Tailwind 클래스 | 비고 |
|------|----------------|------|
| H1 | `text-3xl font-bold tracking-tight` | 페이지 제목 |
| H2 | `text-2xl font-semibold tracking-tight` | 섹션 제목 |
| H3 | `text-xl font-semibold` | 소섹션 |
| H4 | `text-base font-semibold` | 소소섹션 |
| 본문 | `text-sm leading-7 text-foreground` | |
| 뮤트 텍스트 | `text-sm text-muted-foreground` | 부제목, 캡션 |
| 코드 인라인 | `font-mono text-sm bg-muted px-1.5 py-0.5 rounded` | |
| 폰트 패밀리 | `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif` | |

## 색상 사용 가이드

| 용도 | HSL 값 | Tailwind |
|------|--------|----------|
| 페이지 배경 | `hsl(0 0% 100%)` | `bg-background` |
| 기본 텍스트 | `hsl(240 10% 3.9%)` | `text-foreground` |
| 뮤트 텍스트 | `hsl(240 3.8% 46.1%)` | `text-muted-foreground` |
| 카드 배경 | `hsl(0 0% 100%)` | `bg-card` |
| 뮤트 배경 | `hsl(240 4.8% 95.9%)` | `bg-muted` |
| 테두리 | `hsl(240 5.9% 90%)` | `border-border` |
| 프라이머리 | `hsl(240 5.9% 10%)` | `bg-primary text-primary-foreground` |
| 보완 배지 | `hsl(38 92% 50%)` | 커스텀 (노란 계열 유지) |

## 컴포넌트 패턴

### Card
```html
<div class="rounded-lg border border-border bg-card text-card-foreground shadow-sm p-6">
  <div class="text-lg font-semibold mb-2">카드 제목</div>
  <p class="text-sm text-muted-foreground">카드 내용</p>
</div>
```

### Badge
```html
<!-- 기본 -->
<span class="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors border-transparent bg-primary text-primary-foreground">
  라벨
</span>

<!-- 보완 뱃지 -->
<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-amber-500 text-white">
  보완
</span>

<!-- 아웃라인 -->
<span class="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-semibold text-foreground">
  라벨
</span>
```

### Table
```html
<div class="rounded-md border border-border overflow-hidden">
  <table class="w-full text-sm">
    <thead class="bg-muted">
      <tr>
        <th scope="col" class="px-4 py-3 text-left font-medium text-muted-foreground">헤더</th>
      </tr>
    </thead>
    <tbody>
      <tr class="border-t border-border hover:bg-muted/50 transition-colors">
        <td class="px-4 py-3">내용</td>
      </tr>
    </tbody>
  </table>
</div>
```

### Alert (중요 안내)
```html
<div class="relative rounded-lg border border-border p-4 bg-muted/50">
  <div class="font-medium mb-1">주의</div>
  <p class="text-sm text-muted-foreground">내용</p>
</div>
```

### Separator
```html
<hr class="border-border my-6">
```

## 외부 이미지 패턴

```html
<!-- 섹션 헤더 이미지 -->
<figure class="mb-6">
  <img
    src="{external_url}"
    alt="{설명}"
    class="rounded-lg border border-border w-full object-cover max-h-64"
    onerror="this.style.display='none'"
  >
  <figcaption class="text-xs text-muted-foreground mt-2 text-center">
    출처: {domain} — {설명}
  </figcaption>
</figure>

<!-- 인라인 썸네일 (우측 float) -->
<img
  src="{external_url}"
  alt="{설명}"
  class="float-right ml-4 mb-2 rounded-md border border-border w-32 h-32 object-cover"
  onerror="this.parentNode.removeChild(this)"
>
```

## 외부 링크 패턴

```html
<a
  href="{external_url}"
  target="_blank"
  rel="noopener noreferrer"
  class="text-primary underline underline-offset-4 hover:text-muted-foreground transition-colors"
>
  링크 텍스트 <span class="text-xs text-muted-foreground">[{domain}]</span>
</a>
```

## 레이아웃

### 리포트형
```css
body { max-width: 900px; margin: 0 auto; padding: 2rem 1rem; }
.layout-with-toc { display: grid; grid-template-columns: 220px 1fr; gap: 2rem; }
```

### TOC (sticky 사이드바)
```html
<nav class="sticky top-4 h-fit text-sm space-y-1 border-r border-border pr-4">
  <p class="font-medium mb-2 text-foreground">목차</p>
  <a href="#section-1" class="block text-muted-foreground hover:text-foreground transition-colors py-0.5">
    섹션 1
  </a>
</nav>
```

### PPT형
```css
.slide { width: 100vw; height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 4rem; }
```

## 여백 체계 (4px 기반)

| 위치 | Tailwind | px 값 |
|------|----------|-------|
| 섹션 간 | `py-8` | 32px |
| 문단 간 | `mb-4` | 16px |
| 카드 내부 | `p-6` | 24px |
| 인라인 요소 | `px-2.5 py-0.5` | 10px / 2px |

## 코드 블록

```html
<pre class="rounded-md bg-zinc-950 text-zinc-50 p-4 overflow-x-auto text-sm leading-6">
  <code>{코드 내용}</code>
</pre>
```

## 반응형

```css
@media (max-width: 640px) {
  .layout-with-toc { grid-template-columns: 1fr; }
  nav.sticky { position: static; border-right: none; border-bottom: 1px solid hsl(240 5.9% 90%); padding-bottom: 1rem; }
}
```

## 리포트형 섹션 제한

| 항목 | 권장 최대값 |
|------|-----------|
| 섹션당 단어 수 | 500단어 |
| 연속 글머리 기호 수 | 7개 |
| 코드 블록 줄 수 (접기 전) | 30줄 |

## PPT형 슬라이드 제한

| 항목 | 최대값 |
|------|--------|
| 텍스트 | 150단어 |
| 글머리 기호 | 5개 |
| 이미지 | 1개 |
| 핵심 메시지 | 1개 |
