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

어떤 에러든 500에러로 떨어짐 왜지
컨트롤러에서 try catch로 잡아서 전부 500이 됨
해결 -> 예외 처리 -> 너무 복잡해질듯
글로벌 예외처리를 써보자

쿠키 파서가 req.cookies를 못 읽어옴 왜지
-> 그냥 헤더에서 읽어옴

postId가 객체 사애로 저장
파람스에서 따로 안빼와서 생김
직접지정해서 가져오기
->스트링으로나옴 dto에 트랜스폼 설정해뒀는데 왜ㅓ그럼
->자동 변환은 클래스 타입에서만 작동해요.
->ParseIntPipe 사용
