# 🌸 K-Beauty Shop

React + Express 기반의 **K-뷰티 쇼핑몰 클론 프로젝트**입니다.  
단순 UI 구현을 넘어서 **회원/게스트 장바구니 분리**, **로그인 연동**, **다국어(i18n)** 등을 적용해 실제 서비스처럼 동작하도록 만들었습니다.

---

## 📌 프로젝트 개요

- **진짜 서비스 같은 포트폴리오**를 목표로 제작
- JSON-Server 대신 **Express 백엔드 직접 구현**
- 로그인/회원가입, 장바구니 저장 등 **프론트-백 연동 경험**
- 실무 환경에서 흔히 쓰이는 **React + Zustand 상태관리 학습**

---

## 🚀 기술 스택

### Frontend

- React 18, TypeScript
- Zustand (상태 관리)
- React Router
- TailwindCSS
- Sonner (토스트 알림)
- i18n (다국어 지원)

### Backend

- Express
- JSON 파일 기반 DB (db.json)

### 기타

- ESLint + Prettier 코드 컨벤션
- Nodemon 개발 환경

---

## ✨ 주요 기능

- 🔐 **회원가입 & 로그인**

  - 가입 시 DB에 저장, 로그인 시 닉네임 표시
  - 로그아웃 시 세션 스토리지 초기화 및 상태 관리

- 🛒 **장바구니**

  - 게스트 / 유저 장바구니 **완전 분리**
  - 로그인 시 서버(DB)에 저장된 장바구니 자동 불러오기

- 🌍 **다국어 지원 (i18n)**

  - 한국어 🇰🇷, 영어 🇺🇸, 일본어 🇯🇵, 중국어 🇨🇳
  - 버튼 클릭만으로 실시간 언어 변경

- ⭐ **오늘의 특가 & 랭킹 TOP10**

  - API 기반 데이터 정렬 & 리스트 출력
  - 가격순, 평점순 등 다양한 기준 적용 가능

- 🔔 **토스트 알림 (UX 개선)**

  - 장바구니 추가, 로그인 성공/실패, 언어 변경 시 직관적 피드백 제공

- 📱 **반응형 레이아웃**

  - Tailwind 기반으로 PC / Tablet / Mobile 최적화
  - 작은 화면에서도 직관적인 UI 유지

- ⚡ **상태 관리 (Zustand)**

  - Auth / Cart 전역 상태 관리
  - `hydrateCart` & `saveCart`로 클라이언트-서버 데이터 싱크

- 🚀 **백엔드 연동 (Express)**
  - JSON-Server → Express 전환
  - RESTful API 설계 (로그인, 회원가입, 장바구니, 유저 데이터)

---

## 📂 폴더 구조

```bash
frontend/                 # 프론트엔드 (React + Vite)
 └─ src/
    ├─ api/               # API 호출 모듈 (상품, 카테고리, 인증 등)
    ├─ components/        # 공통 UI 컴포넌트 (버튼, 배지, 레이아웃 등)
    ├─ features/          # 페이지 단위 기능 (홈, 카탈로그, 장바구니 등)
    ├─ stores/            # Zustand 상태 관리 (auth, cart)
    ├─ lib/               # i18n 다국어, money 포맷 등 유틸 함수
    └─ public/
       └─ images/         # 프로모션/배너 이미지 리소스

backend/                  # 백엔드 (Express)
 ├─ index.js              # Express 서버 진입점
 └─ db.json               # JSON 기반 DB (유저, 장바구니 저장소)

```

---

## 🚀 배포 주소

프론트엔드(React + Vite) 배포: [https://k-beauty-full.vercel.app](https://k-beauty-full.vercel.app)

---

## 🔑 테스트 계정 (Demo Account)

서비스를 바로 체험할 수 있도록 테스트 계정을 제공합니다.

- **Email**: test@kbeauty.com
- **Password**: kbeauty1234

👉 위 계정으로 로그인하면 회원가입 없이 바로 장바구니, 결제 흐름 등을 확인하실 수 있습니다.

---

## 📸 스크린샷

### 로그인 페이지

<img width="1343" height="607" alt="login_1" src="https://github.com/user-attachments/assets/6c649751-08b6-44af-8696-e3ae6197aeb9" />

### 체크아웃

![checkout](https://github.com/user-attachments/assets/18b16890-a7e5-46eb-bc1c-4787d2739439)

### 홈 검색 및 언어 변경

![search](https://github.com/user-attachments/assets/c79fe591-53c6-45c2-83c9-0cd8972bdbf0) |
![langChange](https://github.com/user-attachments/assets/75eabdd3-62f5-4917-be70-ee752d2f5735) |

---

## 📖 프로젝트 회고

이번 프로젝트는 단순히 프론트엔드 화면을 구성하는 수준을 넘어,  
**백엔드와 연결된 실제 서비스에 가까운 웹 애플리케이션**을 직접 구현해본 경험이었습니다.

- **JSON-Server → Express 백엔드 전환** 과정에서 REST API 설계와 상태 관리의 중요성을 체감
- **게스트/회원 장바구니 분리**를 구현하며 실제 커머스 서비스의 데이터 흐름을 학습
- **다국어(i18n), 토스트 알림, 반응형 레이아웃** 적용을 통해 실무에 가까운 UI/UX 경험 축적

이를 통해 **프론트엔드와 백엔드의 연동 역량**, **상태 관리 설계 능력**,  
그리고 **사용자 경험(UX)을 고려한 개발 감각**을 크게 향상시킬 수 있었습니다.

---

## 📝 앞으로의 발전 방향

- [ ] **JWT 기반 인증**을 통한 로그인 및 보안 강화
- [ ] **MySQL / MongoDB 연동**으로 확장성 있는 DB 설계 구축 예정
- [ ] **관리자 페이지 (Admin Dashboard)**
  - 상품 관리: 상품 등록, 수정, 삭제 및 카테고리 관리
  - 회원 관리: 회원 목록, 권한 설정 (일반 / 관리자)
  - 재고 관리: 재고 수량 확인 및 발주 / 입고 관리
  - 구매 관리: 주문 내역 확인, 배송 상태 업데이트, 환불 처리
- [ ] **쿠폰 및 프로모션 기능**
  - 할인 쿠폰 발급 및 적용 (예: 10% 할인, 무료배송 쿠폰)
  - 특정 상품 / 카테고리별 프로모션 가격 자동 반영
  - 프로모션 기간 설정 (예: 블랙프라이데이, 시즌 세일)
