## 💊 JS 재활치료 lv3-1

### 마이그레이션 MongoDB -> MySQL, sequelize -> prisma

#### 🔧 이용한 툴

`Node.js` `express` `MySQL` `prisma`

#### 구현 할 내용 (과제)

1. lv3에서 구현했던 코드를 prisma로 마이그레이션하기

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
