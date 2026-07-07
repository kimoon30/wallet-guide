# Wallet Guide Vocabulary Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the wallet guide HTML so the requested DeFi/GALXE vocabulary is accurate, grouped, and easy for non-specialists to understand.

**Architecture:** Keep the current static HTML architecture. Edit targeted content blocks in `index.html`: section `03` for smart contracts, section `07` for representative services, section `08` for recommendations, glossary rows, and source list. Verification is done with text search plus an HTML parser check.

**Tech Stack:** Static HTML/CSS/vanilla JavaScript, PowerShell, Python standard library `html.parser` for local validation.

---

### Task 1: Update Smart Contract Explanation

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace section 03 smart contract paragraph**

Replace the existing paragraph under `<h3>스마트 계약</h3>` with a clearer explanation:

```html
<p>스마트 계약은 종이 계약서라기보다 <b>블록체인 위에 공개해 둔 자동 실행 규칙</b>입니다. “돈이 들어오면 티켓을 발급한다”, “담보 비율이 낮아지면 청산한다”처럼 조건과 결과를 코드로 적어 두고, 사용자가 월렛으로 서명하면 그 코드가 실행됩니다. 코드와 현재 상태는 특정 계약 주소에 저장되므로 누구나 기록을 확인할 수 있지만, 배포된 뒤에는 임의로 고치기 어렵습니다.</p>
<p>그래서 월렛의 “서명 요청” 팝업은 단순 로그인 버튼이 아니라, <b>내 주소가 어떤 스마트 계약 기능을 호출해도 된다고 허락하는 순간</b>일 수 있습니다. 토큰·NFT 발행, DeFi 예치·대출, DEX 거래, 에어드랍 클레임이 모두 이 구조 위에서 움직입니다.</p>
```

- [ ] **Step 2: Keep the warning immediately after the explanation**

Do not remove the existing warning callout. It reinforces the same risk model.

### Task 2: Replace Galaxy/Samsung With GALXE

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update section 06 comparison table row**

Replace the `갤럭시` row with:

```html
<tr><td>GALXE</td><td>지갑 연결 후 퀘스트·자격증명·에어드랍 캠페인에 참여하는 Web3 성장 플랫폼</td><td>퀘스트·크리덴셜 · 리워드 플랫폼</td></tr>
```

- [ ] **Step 2: Update the section 06 category codeblock**

Replace the `단말·생활 플랫폼 월렛` line with:

```text
퀘스트·크리덴셜 플랫폼 ─ GALXE
```

- [ ] **Step 3: Replace detailed section 07 service item**

Replace the current `3) 갤럭시 월렛 생태계` heading and content with:

```html
<h3>3) GALXE — 퀘스트·크리덴셜·에어드랍 플랫폼 <span class="badge">월렛 연결형</span></h3>
<p>GALXE는 월렛 자체가 아니라, 프로젝트가 사용자에게 미션을 내고 참여 이력을 검증해 보상을 제공하는 <b>Web3 성장 플랫폼</b>입니다. 사용자는 월렛을 연결하고 소셜 팔로우, 온체인 거래, NFT 보유, 특정 토큰 보유 같은 조건을 충족해 퀘스트에 참여합니다. <a href="https://www.galxe.com/" target="_blank" rel="noopener">공식 ↗</a></p>
<div class="callout note"><div class="co-head"><span class="co-ic">📌</span>어떻게 쓰이나</div><p>프로젝트는 GALXE Quest에서 참여 조건을 만들고, 온체인·오프체인 크리덴셜로 사용자의 자격을 확인합니다. 보상은 포인트, NFT/OAT, allowlist, 토큰 리워드처럼 캠페인마다 다릅니다.<sup class="cite"><a href="#src-4" aria-label="출처 4">[4]</a></sup></p></div>
<div class="callout warn"><div class="co-head"><span class="co-ic">⚠️</span>참여 전 확인</div><p>퀘스트 참여가 수익을 보장하지 않습니다. 공식 도메인인지, 어떤 지갑 권한을 요청하는지, 토큰 리워드가 취소 불가능한 지급인지, 개인정보·소셜 계정 연결 범위가 무엇인지 확인해야 합니다.</p></div>
```

- [ ] **Step 4: Update recommendation table**

Replace the Samsung Wallet recommendation row with:

```html
<tr><td>에어드랍·퀘스트·커뮤니티 미션을 학습하고 싶다</td><td><b>GALXE</b></td><td>월렛 연결, 자격 검증, 캠페인 보상 구조를 한 번에 볼 수 있음</td></tr>
```

### Task 3: Add Grouped DeFi Vocabulary To Glossary

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Insert glossary rows after `Web3 / EVM`**

Insert alternating `gl-row` and `gl-detail` rows covering:

```html
<tr class="gl-row"><td>DeFi / DeFi 프로토콜</td><td>은행·증권사 없이 스마트 계약으로 쓰는 금융 앱 묶음</td></tr>
<tr class="gl-detail"><td colspan="2"><div class="gl-inner"><strong>DeFi</strong>(탈중앙화 금융)는 월렛만 있으면 예치, 대출, 교환, 파생상품, 수익 전략에 접근할 수 있게 만든 금융 앱들의 묶음입니다. <strong>DeFi 프로토콜</strong>은 그 기능을 실제로 처리하는 스마트 계약 시스템입니다. 편리하지만 예금자보호가 아니며, 코드 버그·가격 급락·유동성 부족·청산 위험을 사용자가 직접 이해해야 합니다.</div></td></tr>
```

Continue with grouped entries for DeFi Gateway, VASP, Kaia, aggregator/vault/SuperEarn, Morpho/Pendle/Yield8, staking/leverage staking, DEX LP/Curve LP, collateral lending/RWA fund, GALXE/airdrop, Zora/Sweat/StickK, on-chain lottery/P2P zero-sum.

- [ ] **Step 2: Expand existing smart contract glossary detail**

Replace the current detail with a longer non-technical explanation matching Task 1.

### Task 4: Update Sources

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace source 4**

Use GALXE official and docs links instead of Samsung:

```html
<li id="src-4">GALXE 공식 및 Galxe Quest 문서 — <a href="https://www.galxe.com/" target="_blank" rel="noopener"><code>galxe.com</code></a> · <a href="https://docs.galxe.com/quest/introduction" target="_blank" rel="noopener"><code>docs.galxe.com</code></a></li>
```

- [ ] **Step 2: Append source entries for DeFi vocabulary**

Append entries for Ethereum smart contracts/DeFi/staking, FATF VASP guidance, Kaia, SuperEarn/Yield8, Morpho/Pendle, Yearn/Beefy/Curve, Zora/Sweat/StickK. Source numbers can continue from `src-23`.

### Task 5: Verify

**Files:**
- Check: `index.html`

- [ ] **Step 1: Search for replaced words**

Run:

```powershell
Select-String -LiteralPath 'index.html' -Pattern '갤럭시|Samsung Wallet|Samsung Blockchain Wallet'
```

Expected: no representative-service references remain. Existing unrelated source text should not appear because source 4 is replaced.

- [ ] **Step 2: Search for required vocabulary**

Run:

```powershell
Select-String -LiteralPath 'index.html' -Pattern 'GALXE|DeFi Gateway|VASP|Kaia|SuperEarn|Morpho|Pendle|Yield8|Curve LP|Zora Rewards|Sweat Economy|StickK'
```

Expected: each required term appears at least once.

- [ ] **Step 3: Parse HTML**

Run:

```powershell
@'
from html.parser import HTMLParser
from pathlib import Path

class Parser(HTMLParser):
    pass

Parser().feed(Path("index.html").read_text(encoding="utf-8"))
print("HTML parser completed")
'@ | python -
```

Expected: `HTML parser completed`.
