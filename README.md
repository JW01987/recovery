# 💊 JS 재활치료 lv6-1

## TypeScript

### 🔧 이용한 툴

`NodeJS` `NestJS` `mySQL` `prisma` `TypeScript` `Jest`

### 구현 할 내용 (과제)

1. NestJS을 적용하여 Lv.6 프로젝트를 마이그레이션하기

### ERD

![](https://velog.velcdn.com/images/jw01987/post/7d246a1a-5540-44d6-a817-0c16e70d1570/image.png)

### API 명세

| 기능             | method | API path                |
| ---------------- | ------ | ----------------------- |
| 회원가입         | POST   | /api/register           |
| 로그인           | GET    | /api/login              |
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
├── 🗂️ test
│ ├── comment.test.ts
│ ├── like.test.ts
│ ├── post.test.ts
│ └── user.test.ts
│
├── tsconfig.json
├── README.md
├── .gitignore
├── package.json
└── package-lock.json
```

### 트러블 슈팅
