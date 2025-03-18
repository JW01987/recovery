# 💊 JS 재활치료 lv6

## TypeScript

### 🔧 이용한 툴

`NodeJS` `express` `mySQL` `prisma` `TypeScript`

### 구현 할 내용 (과제)

1. TypeScript을 적용하여 Lv.5 프로젝트를 마이그레이션하기

### ERD

![](https://velog.velcdn.com/images/jw01987/post/7d246a1a-5540-44d6-a817-0c16e70d1570/image.png)

### API 명세

| 기능             | method | API path                |
| ---------------- | ------ | ----------------------- |
| 회원가입         | POST   | /api/register           |
| 로그인           | PATCH  | /api/login              |
| 게시글 모두 조회 | GET    | /api/postall            |
| 게시글 조회      | GET    | /api/post               |
| 게시글 작성      | POST   | /api/post               |
| 게시글 수정      | PATCH  | /api/post/:postId       |
| 게시글 삭제      | DELETE | /api/post/:postId       |
| 댓글 조회        | GET    | /api/comment            |
| 댓글 작성        | POST   | /api/comment            |
| 댓글 수정        | PATCH  | /api/comment/:commentId |
| 댓글 삭제        | DELETE | /api/comment/:commentId |
| 좋아요           | PATCH  | /api/like/:postId       |
| 좋아요 확인      | GET    | /api/like               |

### 디렉토리 구성

```
🗃️
├── app.ts
│
├── 🗂️ middlewares
│ ├── auth.ts
│ └── errorHandler.ts
│
├── 🗂️ prisma
│ ├── 📂 migrations
│ │ ├── 2025013109567_migration2
│ │ └── migration.sql
│ └── schema.prisma
│
├── 🗂️ controllers
│ ├── comments.controller.ts
│ ├── likes.controller.ts
│ ├── posts.controller.ts
│ └── users.controller.ts
│
├── 🗂️ repositories
│ ├── comments.repository.ts
│ ├── likes.repository.ts
│ ├── posts.repository.ts
│ └── users.repository.ts
│
├── 🗂️ services
│ ├── comments.service.ts
│ ├── likes.service.ts
│ ├── posts.service.ts
│ └── users.service.ts
│
├── 🗂️ routes
│ ├── comments.routes.ts
│ ├── likes.routes.ts
│ ├── posts.routes.ts
│ ├── users.routes.ts
│ └── index.ts
│
├── 🗂️ utils
│ ├ 📂 dtos
│ │ ├── commentDto.ts
│ │ ├── likeDto.ts
│ │ ├── postDto.ts
│ │ └── userDto.ts
│ ├── authRequest.ts
│ └── error.ts
│
│
├── tsconfig.json
├── README.md
├── .gitignore
├── package.json
└── package-lock.json
```

### 트러블 슈팅

[1. Request 타입을 지정하는 문제](https://velog.io/@jw01987/TS%EC%97%90%EC%84%9C-%ED%83%80%EC%9E%85%EC%A7%80%EC%A0%95%ED%95%A0%EB%95%8C%EB%8A%94-%EC%B6%9C%EC%B2%98%EB%A5%BC-%ED%99%95%EC%8B%A4%ED%9E%88)

[2. DTO를 만들어 관리해보자](https://velog.io/@jw01987/DTO%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B4%85%EC%8B%9C%EB%8B%A4)

[3. 커스텀 리퀘스트 타입과 리퀘스트 핸들러 충돌](https://velog.io/@jw01987/%EB%A6%AC%ED%80%98%EC%8A%A4%ED%8A%B8-%ED%83%80%EC%9E%85%EA%B3%BC-%EB%A6%AC%ED%80%98%EC%8A%A4%ED%8A%B8-%ED%95%B8%EB%93%A4%EB%9F%AC-%EC%B6%A9%EB%8F%8C)
