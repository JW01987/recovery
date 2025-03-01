# 💊 JS 재활치료 lv5

## Layered Architecture Pattern

### 🔧 이용한 툴

`NodeJS` `express` `mySQL` `prisma`

### 구현 할 내용 (과제)

1. Layered Architecture Pattern을 적용하여 Lv.4 프로젝트 개선하기
2. 에러 처리하기
   2-1 미들웨어로 에러 처리하기

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
├── app.js
│
├── 🗂️ middlewares
│ ├── auth.js
│ └── errorHandler.js
│
├── 🗂️ prisma
│ ├── 📂 migrations
│ │ └── 2025013109567_migration2
│ │ └── migration.sql
│ └── schema.prisma
│
├── 🗂️ controllers
│ ├── comments.controller.js
│ ├── likes.controller.js
│ ├── posts.controller.js
│ └── users.controller.js
│
├── 🗂️ repositories
│ ├── comments.repository.js
│ ├── likes.repository.js
│ ├── posts.repository.js
│ └── users.repository.js
│
├── 🗂️ services
│ ├── comments.service.js
│ ├── likes.service.js
│ ├── posts.service.js
│ └── users.service.js
│
├── 🗂️ routes
│ ├── comments.routes.js
│ ├── likes.routes.js
│ ├── posts.routes.js
│ ├── users.routes.js
│ └── index.js
│
├── 🗂️ utils
│ └── error.js
│
├── README.md
├── .gitignore
├── package.json
└── package-lock.json
```

### 트러블 슈팅

#### 1. [구조분해할당으로 파라미터를 넘기기](https://velog.io/@jw01987/%EB%82%98%EB%A7%8C-%ED%97%B7%EA%B0%88%EB%A6%AC%EB%8A%94-%EA%B5%AC%EC%A1%B0%EB%B6%84%ED%95%B4%ED%95%A0%EB%8B%B9)

#### 2. 메세지를 클라이언트에게 리턴해야할때 어디서 리턴해야하는지

문제: 메세지를 클라이언트에 보내야하는 경우가 많은데 컨트롤러, 서비스 중 어디에서 메세지를 보내야하는지 모르겠다

문제해결: [NestJS의 공식문서에서](https://docs.nestjs.com/controllers) 예시로 든 상황이 대부분 컨트롤러에서 리턴함. 컨트롤러는 클라이언트의 요청을 받아들이고, 서비스 계층을 호출하여 비즈니스 로직을 처리한 후, 그 결과를 클라이언트에게 응답하는 역할을 함.

```js
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
```

#### 3. 서비스, 레포지토리에서 리턴할 값이 없으면 무엇을 리턴해야하나

문제: 컨트롤러에서 메세지만 리턴하면 되는데 서비스와 레포지토리에서는 어떤걸 리턴해야할지 모르겠다

문제해결: 서비스에서 레포지포리에서 반환한 DB리턴 값으로 확인 후 Boolean을 반환하기로 함
![](https://velog.velcdn.com/images/jw01987/post/2335aa71-8e67-44b0-97eb-d554ab2976ee/image.png)
