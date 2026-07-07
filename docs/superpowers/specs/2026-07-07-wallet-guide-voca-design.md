# Wallet Guide Vocabulary Update Design

## Goal

`prompt/002.voca.md`의 요청을 `index.html`에 반영한다. 기존 문서 흐름은 유지하되, 스마트 계약 설명을 입문자 친화적으로 보강하고, 잘못 들어간 `갤럭시/Samsung Wallet` 사례를 `GALXE`로 교체하며, DeFi 관련 키워드를 연관 그룹별 용어 사전에 추가한다.

## Scope

- Modify `index.html` only for user-facing content.
- Keep the current one-file static page structure, CSS, and JavaScript behavior.
- Add source entries only for factual product/protocol claims that need external support.
- Do not rewrite unrelated reward-app analysis or page layout.

## Content Design

### Smart Contract

Expand the short definition in section `03` and the glossary detail. Explain smart contracts as "public rule boxes" rather than legal contracts: code and state live at an on-chain address, users interact by wallet signature, and execution follows the deployed code. Include a plain warning that bugs, malicious approvals, and irreversible execution are practical risks.

### GALXE Replacement

Replace the current Samsung/Galaxy representative-service slot with `GALXE`. Describe it as a Web3 growth, quest, credential, and reward platform rather than a device wallet. Mention that users connect a wallet, complete social/on-chain tasks, and may receive points, NFTs/OATs, allowlist eligibility, or token rewards. Keep the caution that quest rewards do not guarantee investment value and that signature prompts still require review.

### DeFi Vocabulary Grouping

Group the new vocabulary by meaning, not by prompt numbering:

- Basic rails and actors: `DeFi`, `DeFi Gateway`, `DeFi 프로토콜`, `VASP`, `Kaia 체인`.
- Yield and portfolio wrappers: `자산 어그리게이터`, `Vault`, `SuperEarn`, `Morpho`, `Pendle`, `Yield8`, `Yearn Finance`, `Beefy Finance`.
- Strategy primitives: `스테이킹`, `레버리지 스테이킹`, `DEX LP풀`, `Curve LP`, `담보대출 프로토콜`, `RWA 펀드`.
- Reward and behavior models: `신규토큰 에어드랍`, `GALXE`, `Zora Rewards`, `Sweat Economy`, `StickK`.
- Risk patterns: `온체인 로또`, `P2P 제로섬`.

## Error Handling And Caveats

The page is educational, not financial advice. High-yield terms must include risk language: smart contract risk, liquidation risk, liquidity risk, RWA off-chain/legal risk, token price volatility, and promotional-airdrop uncertainty.

## Verification

- Search `index.html` to confirm `갤럭시` no longer appears in representative-service content.
- Confirm `GALXE` appears in the service table, detailed service section, recommendation table, glossary, and sources.
- Confirm the glossary still alternates `gl-row` and `gl-detail` rows.
- Run a lightweight HTML parse/check script to catch malformed tags.
