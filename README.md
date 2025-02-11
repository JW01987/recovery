## 💊 JS 재활치료 lv5

### Layered Architecture Pattern

#### 🔧 이용한 툴

`NodeJS` `express` `mySQL` `prisma`

#### 구현 할 내용 (과제)

1. Layered Architecture Pattern을 적용하여 Lv.4 프로젝트 개선하기
2. 에러 처리하기
   2-1 미들웨어로 에러 처리하기

#### ERD

![](https://velog.velcdn.com/images/jw01987/post/7d246a1a-5540-44d6-a817-0c16e70d1570/image.png)

#### API 명세

| 기능             | method | API path                       |
| ---------------- | ------ | ------------------------------ |
| 회원가입         | POST   | /api/register                  |
| 로그인           | POST   | /api/login                     |
| 게시글 모두 조회 | GET    | /api/postall                   |
| 게시글 조회      | GET    | /api/post                      |
| 게시글 작성      | POST   | /api/post                      |
| 게시글 수정      | UPDATE | /api/post/update/:postId       |
| 게시글 삭제      | DELETE | /api/post/delete/:postId       |
| 댓글 조회        | GET    | /api/comment                   |
| 댓글 작성        | POST   | /api/comment                   |
| 댓글 수정        | UPDATE | /api/comment/update/:commentId |
| 댓글 삭제        | DELETE | /api/comment/delete/:commentId |
| 좋아요           | POST   | /api/like/:postId              |
| 좋아요 확인      | GET    | /api/like                      |

#### 디렉토리 구성

🗃️
├── app.js
│
├── 🗂️ middlewares
│ └── auth.js
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
├── README.md
├── .gitignore
├── package.json
└── package-lock.json

#### 트러블 슈팅
