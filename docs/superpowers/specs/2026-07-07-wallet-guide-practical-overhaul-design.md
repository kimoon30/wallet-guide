# Wallet Guide Practical Overhaul Design

## Goal

`index.html`을 비전공 서비스기획자가 월렛 서비스를 맡을 때 바로 참고할 수 있는 실무형 가이드로 개편한다. 기존 입문 개념과 서비스 비교는 유지하되, 월렛 코어 기능, 스마트 월렛 최신 UX, 재화 정책, 경품 응모, 기프티콘 교환, 온체인/오프체인 데이터 흐름, 운영/CS 리스크를 본문 파트로 추가한다.

## Scope

- Primary output: `index.html`
- Supporting output: `output/002_wallet_guide_restructured.md`
- Preserve the current static HTML layout, sidebar behavior, glossary toggle, and citation validation flow.
- Keep existing GALXE and DeFi vocabulary updates.
- Treat legal, regulatory, tax, and financial items as general information and mark expert review points clearly.

## Content Design

### Structure

The guide becomes a four-part learning report:

1. Part A: wallet fundamentals.
2. Part B: service type comparison.
3. Part C: service-planning practice.
4. Part D: reward app market and MyB case analysis.

Part C is inserted between the current service comparison and reward market sections. Existing reward-market sections are renumbered so the sidebar reads sequentially.

### Practical Planning Sections

Part C adds six sections:

- Wallet core feature definition: account creation, login, recovery, address management, balance, transfer, signature, approvals, transaction history, alerts, and CS hooks.
- Modern wallet UX: ERC-4337, EIP-7702, passkeys, sponsored gas, batching, session keys, and smart-wallet recovery explained as product decisions.
- Reward currency policy: paid/free/bonus points, accrual source, spending order, expiration, reversal, reconciliation, and fraud holds.
- Prize draw and gifticon exchange: entry tickets, draw rules, winner cancellation, tax/review points, gifticon inventory, delivery failure, expiry, and refund/extension distinction.
- On-chain/off-chain flow: app ledger, wallet address, SBT/W3ID, smart-contract events, external gifticon API, and block explorer checks.
- Operations, CS, and risk: incident categories, first response, owner, evidence, user notice, and service recovery.

### Tone

The document remains easy for non-engineers, but each section ends in decisions a PM must make. The guide should not give exploit instructions, investment advice, or legal advice.

## Verification

- Citation anchors must pass `_workspace/05_validate_citations.mjs`.
- Sidebar item IDs must match existing section IDs.
- Search must confirm `계정 추상화`, `EIP-7702`, `ERC-4337`, `패스키`, `재화 정책`, `경품 응모`, and `기프티콘` appear in `index.html`.
- HTML must parse with Python `html.parser`.
- Markdown source should contain the same new practical sections in readable form.

## Self Review

- No placeholders remain.
- Scope is one document overhaul, not a new application.
- Regulatory content is framed as general information and expert-review input.
