<!--
월렛 가이드 분리본 읽기 맵
- 목적: 독자 유형별로 어떤 문서를 먼저 읽어야 하는지 안내
- 관련 문서:
  - 003_wallet_beginner_guide.md
  - 004_wallet_product_planning_guide.md
  - 005_reward_app_market_myb_guide.md
  - 002_wallet_guide_restructured.md
-->

# 월렛 가이드 읽기 맵

이 폴더의 문서는 독자 목적에 따라 나누어 읽는 것을 권장합니다.

| 독자 | 먼저 읽을 문서 | 다음 문서 |
|---|---|---|
| 월렛을 처음 배우는 비전공자 | [초보자 가이드](003_wallet_beginner_guide.md) | 필요할 때 [통합 원본](002_wallet_guide_restructured.md) |
| 월렛/리워드 기능을 기획하는 PM·기획자 | [초보자 가이드](003_wallet_beginner_guide.md) | [서비스기획 실무 가이드](004_wallet_product_planning_guide.md) |
| 리워드 앱과 마이비 시장성을 보는 사람 | [리워드 앱·마이비 분석 가이드](005_reward_app_market_myb_guide.md) | [서비스기획 실무 가이드](004_wallet_product_planning_guide.md) |
| 전체 내용을 한 번에 보고 싶은 사람 | [통합 원본](002_wallet_guide_restructured.md) | 분리본 3종으로 재확인 |

---

## 문서별 역할

### 1. 초보자용

파일: [003_wallet_beginner_guide.md](003_wallet_beginner_guide.md)

목표는 월렛을 처음 보는 사람이 **위험한 행동을 피하고, 기본 개념을 설명하고, 소액 실습 전 점검할 수 있게 되는 것**입니다.

주요 내용:

- 월렛은 코인을 담는 앱이 아니라 키와 서명을 관리하는 도구
- 주소, 개인키, 시드 문구의 차이
- 코인, 토큰, NFT, 가스비, 네트워크
- 연결, 서명, 승인, 전송의 차이
- 위험한 서명 문구
- 5일 학습 루트
- 사고가 의심될 때 30초 분류

이 문서는 첫 회독용입니다. 서비스기획, 수익모델, 마이비 매출 분석은 일부러 제외했습니다.

---

### 2. 서비스기획자용

파일: [004_wallet_product_planning_guide.md](004_wallet_product_planning_guide.md)

목표는 월렛 또는 리워드 기능을 설계하는 사람이 **화면보다 먼저 정책, 상태, 원장, 운영 기준을 정의할 수 있게 되는 것**입니다.

주요 내용:

- 키 관리 주체와 복구 방식
- 월렛 코어 기능 정의
- 스마트 월렛, 패스키, Paymaster, 세션키
- 재화 정책과 원장 상태
- 경품 응모와 기프티콘 교환 상태 머신
- 온체인·오프체인 데이터 흐름
- 운영·CS·리스크 관리
- 출시 전 체크리스트

이 문서는 기능 요구사항, 정책 정의서, 운영 매뉴얼의 뼈대를 만들 때 쓰기 좋습니다.

---

### 3. 리워드 앱/마이비 분석용

파일: [005_reward_app_market_myb_guide.md](005_reward_app_market_myb_guide.md)

목표는 리워드 앱을 사업 관점에서 보는 사람이 **다운로드 수가 아니라 활성도, 데이터 품질, 보상비, 공헌이익, 광고주 반복 구매를 기준으로 판단할 수 있게 되는 것**입니다.

주요 내용:

- 리워드 앱의 돈과 데이터 흐름
- 리워드 앱 유형과 수익모델
- MAU, DAU, 리텐션, ARPDAU, CAC, LTV, 공헌이익
- 오베이, 캐시워크, 토스 혜택, 리워디, 코퀴즈, 돈이돼지 사례
- 마이비의 사업 구조, W3ID, SBT, 애드체인
- 마이비 매출·투자 해석 주의점
- 주요 위험요인과 평가 체크리스트

이 문서는 시장성 검토, 경쟁 서비스 비교, 마이비 사례 분석에 적합합니다.

---

## 추천 읽기 순서

### 완전 초보자

```text
003 초보자용
-> 필요한 부분만 002 통합 원본 참고
```

### 서비스기획자

```text
003 초보자용
-> 004 서비스기획자용
-> 005 리워드 앱/마이비 분석용, 필요 시
```

### 사업분석·시장조사 목적

```text
005 리워드 앱/마이비 분석용
-> 004 서비스기획자용
-> 003 초보자용, 월렛 개념 보강이 필요할 때
```

### 전체 리뷰 목적

```text
002 통합 원본
-> 003 초보자용으로 입문 흐름 점검
-> 004 서비스기획자용으로 정책·운영 점검
-> 005 시장분석용으로 리워드 앱 판단 기준 점검
```

---

## 현재 파일 구조

| 파일 | 역할 |
|---|---|
| [000_wallet_guide_reading_map.md](000_wallet_guide_reading_map.md) | 독자별 읽기 안내 |
| [002_wallet_guide_restructured.md](002_wallet_guide_restructured.md) | 전체 통합 원본 |
| [003_wallet_beginner_guide.md](003_wallet_beginner_guide.md) | 초보자 전용 압축본 |
| [004_wallet_product_planning_guide.md](004_wallet_product_planning_guide.md) | 서비스기획자용 실무본 |
| [005_reward_app_market_myb_guide.md](005_reward_app_market_myb_guide.md) | 리워드 앱/마이비 시장분석본 |

