# Wallet Guide Practical Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the wallet guide into a practical service-planning guide by adding product policy and operations content while preserving the existing static page.

**Architecture:** Keep the one-file HTML page. Insert a new Part C after service comparison, renumber the reward-market content as Part D, update sidebar metadata, add source entries, and mirror the practical content in the Markdown source.

**Tech Stack:** Static HTML/CSS/vanilla JavaScript, Markdown, PowerShell, Node citation validator, Python HTML parser.

---

### Task 1: Update Guide Positioning

**Files:**
- Modify: `index.html`

- [ ] Change the HTML title and meta description to say the guide covers wallet service planning.
- [ ] Update hero copy, stats, and the "read this guide" block to show four parts and 18 core sections.
- [ ] Update the first "what this guide gives you" language so PM decisions are explicit.

### Task 2: Insert Practical Service-Planning Part

**Files:**
- Modify: `index.html`

- [ ] Insert Part C after `sec-08`.
- [ ] Add `sec-09` through `sec-14` for wallet core features, modern wallet UX, reward currency policy, prize/gifticon policy, data flow, and operations risk.
- [ ] Include tables and compact flow blocks so PMs can use the content as checklists.
- [ ] Cite official or high-trust sources for account abstraction, passkeys, Korean regulation, gifticon/points policy, and privacy/location topics.

### Task 3: Renumber Reward Market Sections

**Files:**
- Modify: `index.html`

- [ ] Change old Part C to Part D.
- [ ] Rename old `sec-09` to `sec-15`, old `sec-10` to `sec-16`, old `sec-11` to `sec-17`, and old `sec-12` to `sec-18`.
- [ ] Update visible section numbers and JavaScript sidebar items.
- [ ] Update final summary and checklist to include the new practical section.

### Task 4: Update Sources And Glossary

**Files:**
- Modify: `index.html`

- [ ] Append source entries for Ethereum account abstraction, EIP/ERC standards, passkeys/WebAuthn, Korean second-stage virtual-asset legislation, prepaid instruments, gifticon standard terms, prize guidance, privacy policy guidance, and location-information law.
- [ ] Add glossary rows for 계정 추상화, 패스키, Paymaster, 세션키, 재화 원장, 경품 응모, 기프티콘 교환.

### Task 5: Mirror Markdown Source

**Files:**
- Modify: `output/002_wallet_guide_restructured.md`

- [ ] Update the title and table of contents.
- [ ] Add the same Part C practical sections in Markdown.
- [ ] Renumber the reward-market sections as Part D.
- [ ] Add the same source entries in compact form.

### Task 6: Verify

**Files:**
- Check: `index.html`
- Check: `output/002_wallet_guide_restructured.md`

- [ ] Run `node .\_workspace\05_validate_citations.mjs .\index.html` from `wallet-guide`.
- [ ] Run a Python HTML parser over `index.html`.
- [ ] Run `rg` for required practical terms.
- [ ] Run `git diff --check`.

## Self Review

- The plan covers every requirement in the design.
- No placeholder language is used.
- The work is scoped to document content and navigation metadata.
