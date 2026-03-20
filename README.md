# STM_WEB

STEMINUS(KE) 동아리 모집/소개용 웹 프로젝트입니다. 현재 저장소는 `frontend` 디렉터리에 Next.js 기반 프론트엔드가 구현되어 있고, 루트는 저장소 안내 역할만 합니다.

## 프로젝트 개요

이 프로젝트는 STEMINUS 동아리의 소개, 모집 분야 안내, 지원 일정 안내, 합격 여부 조회, 로그인 진입 화면을 제공하는 단일 프론트엔드 웹앱입니다.

주요 목적:

- 동아리 소개 페이지 제공
- 모집 분야(HW, SW, NS) 안내
- 지원 일정 및 지원 CTA 노출
- 1차 합격 여부 조회 모달 제공
- Firebase Auth 기반 로그인 확장 준비

## 기술 스택

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Firebase Auth

## 현재 구현된 화면

모든 페이지는 `frontend/app` 아래 App Router 구조로 구성되어 있습니다.

- `/`
  홈 화면. 메인 모집 CTA와 함께 정보 모달, 합격 조회 모달 컴포넌트를 포함합니다.
- `/about`
  STEMINUS 소개 및 활동 아카이브 성격의 페이지입니다.
- `/activity`
  모집 분야를 HW, SW, NS로 나누어 소개합니다.
- `/apply`
  모집 일정과 지원 안내를 보여줍니다. 현재는 실제 폼 연결 대신 마감 상태 모달 중심 UI입니다.
- `/login`
  로그인 페이지 자리입니다. Firebase Google 로그인 코드가 일부 주석 처리된 상태로 남아 있습니다.
- `/admin`
  아직 비어 있는 페이지입니다.

## 핵심 구성 요소

- `frontend/app/components/Header.tsx`
  상단 네비게이션, 모바일 메뉴, 로그인 상태 표시를 담당합니다.
- `frontend/app/components/information.tsx`
  공지용 모달 컴포넌트입니다. 현재 기본적으로 열리지 않도록 되어 있습니다.
- `frontend/app/components/result-check.tsx`
  합격 여부 조회 모달입니다. 브라우저 내에서 암호화된 데이터 복호화, 무결성 검사, 입력 제한, 시도 횟수 제한 로직을 포함합니다.
- `frontend/lib/firebase.ts`
  Firebase 앱과 Auth 클라이언트 초기화 로직입니다.
- `frontend/lib/formatName.ts`
  사용자 이름 표시용 문자열 정리 함수입니다.

## 디렉터리 구조

```text
STM_WEB/
├─ README.md
└─ frontend/
   ├─ app/
   │  ├─ about/
   │  ├─ activity/
   │  ├─ admin/
   │  ├─ apply/
   │  ├─ components/
   │  ├─ login/
   │  ├─ layout.tsx
   │  └─ page.tsx
   ├─ lib/
   ├─ public/
   ├─ package.json
   └─ tsconfig.json
```

## 실행 방법

Node.js 20 환경을 기준으로 작성되어 있습니다.

```bash
cd frontend
npm install
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하면 됩니다.

배포용 실행:

```bash
cd frontend
npm run build
npm run start
```

## 환경 변수

Firebase 로그인 기능을 실제로 사용하려면 아래 공개 환경 변수가 필요합니다.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

환경 변수가 없으면 `getClientAuth()`는 `null`을 반환하도록 되어 있어, 인증 기능은 비활성 상태로 동작합니다.

## 현재 상태 정리

이 저장소는 완성된 서비스라기보다 모집 시즌용 UI와 일부 기능을 우선 구현한 상태에 가깝습니다.

- 디자인 중심의 페이지 구성이 대부분 완료되어 있음
- Firebase Auth 연동은 구조만 준비되어 있고 로그인 플로우는 미완성
- `admin` 페이지는 미구현
- 실제 지원서 제출 백엔드/API는 연결되어 있지 않음
- 합격 조회 기능은 클라이언트 내부 데이터 기반으로 동작

## 확인한 이슈

`frontend`에서 `npm run lint`를 실행하면 현재 실패합니다.

주요 원인:

- 일부 미사용 import 존재
- `any` 타입 사용
- React ESLint 규칙(`react-hooks/set-state-in-effect`) 위반

즉, README 기준 현재 프로젝트는 "실행 가능한 UI 중심 프론트엔드"이지만, 품질 정리와 미완성 기능 보강이 추가로 필요한 상태입니다.
