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

#### 트러블 슈팅

1. 데이터 삭제 없이 마이그레이션 하기

모델을 수정하고 DB에 적용하려했는데 데이터를 삭제해야한다해서 다른 방법을 찾음

> `npx prisma db push` 를 이용하여 데이터를 바꾸고 마이그레이션을 남기지 않고 해결

[다른 방법들에 대해서는 블로그를 작성](https://velog.io/@jw01987/%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%82%AD%EC%A0%9C-%EC%97%86%EC%9D%B4-Prisma-%EB%A7%88%EC%9D%B4%EA%B7%B8%EB%A0%88%EC%9D%B4%EC%85%98%ED%95%98%EA%B8%B0)

2. `prismaclientvalidationerror` 오류

아래의 코드에서 오류가 났다
다른 오류 메세지 없이 `prismaclientvalidationerror` 만 있어서 어떤 오류인지 알 수 없었다
![](https://velog.velcdn.com/images/jw01987/post/7269931c-e655-494d-96bf-968126c3c51e/image.png)

![](https://velog.velcdn.com/images/jw01987/post/3708397b-1ed0-44b4-96be-27a0b8811be8/image.png)

보기에는 모델을 잘 설정한 것 같았지만

> createdAt과 updatedAt은 @default가 없어, 이 값들이 누락되면 오류가 발생할수있다

![](https://velog.velcdn.com/images/jw01987/post/e28af647-c45d-4e79-9aab-59f53258cc18/image.png)

@default를 설정해서 오류를 수정할 수 있었다.

또한 createdAt과 updatedAt은 Prisma가 자동으로 처리하므로 코드에서 제거해도 된다.
