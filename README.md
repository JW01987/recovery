## 💊 JS 재활치료 lv4

### 마이그레이션 MongoDB -> MySQL, sequelize -> prisma

#### 🔧 이용한 툴

`Node.js` `express` `MySQL` `prisma`

#### 구현 할 내용 (과제)

댓글에 로그인 토큰 기능 추가, 좋아요 기능 추가하기

1. 댓글 목록 조회 API
   - 로그인 토큰을 전달하지 않아도 댓글 목록 조회가 가능하도록 하기
   - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기
   - 작성 날짜 기준으로 내림차순 정렬하기
2. 댓글 작성 API
   - 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 댓글 작성 가능
   - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
   - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
3. 댓글 수정 API
   - 로그인 토큰을 검사하여, 해당 사용자가 작성한 댓글만 수정 가능
   - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
   - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
4. 댓글 삭제 API
   - 로그인 토큰을 검사하여, 해당 사용자가 작성한 댓글만 삭제 가능
   - 원하는 댓글을 삭제하기
5. 게시글 좋아요 API
   - 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 게시글 좋아요 가능
   - 로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 좋아요 취소 할 수 있게 하기
   - 게시글 목록 조회시 글의 좋아요 갯수도 같이 표출하기
6. 좋아요 게시글 조회 API
   - 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 좋아요 게시글 조회 가능
   - 로그인 토큰에 해당하는 사용자가 좋아요 한 글에 한해서, 조회할 수 있게 하기
   - 제목, 작성자명(nickname), 작성 날짜, 좋아요 갯수를 조회하기
   - 제일 좋아요가 많은 게시글을 맨 위에 정렬하기 (내림차순)

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

#### 트러블 슈팅

1. 문제: 좋아요 테이블 구현하기

해결방법: 이전에는 좋아요에 1개씩 추가하는 것을 생각했는데 유저마다 포스트에 좋아요를 한번씩만 누를수 있다는 것을 생각
좋아요는 어차피 포스트와 유저에 관계를 두고 있으므로 참, 거짓으로 할 수 있을 것이라 생각

좋아요를 참으로 두고 생성

2. 문제: 좋아요 등록 취소 기능구현
   좋아요 등록하는 코드를 구현하는중 `PrismaClientValidationError` 오류가 발생

```js
const a = await prisma.likes.update({
  where: { userId, postId },
  data: { like: false },
});
```

해결방법: where 은 단일 필드(primary key) 또는 복합 고유 필드(unique constraint)가 들어가야 한다
그래서 userId + postId의 조합이 유일함을 보장하지 않으면 update가 불가능한것

`@@unique([userId, postId])` 를 추가해서 userId + postId의 조합이 유일함을 보장해야한다

내 likes 테이블에서 userId + postId의 조합은 하나 밖에 없으므로 모델에 추가해주었다

복합키를 사용하는 수정된 코드

```js
const a = await prisma.likes.update({
  where: { userId_postId: { userId, postId } },
  data: { like: false },
});
```

3. 문제: 좋아요 갯수 순서대로 정렬하기
   orderBy와 \_count를 사용하여 정렬을 하려했으나 오류가 계속 발생

```
   orderBy: {
   _count: {
      Likes: {
         _all: "desc",
      },
    },
   },
```

해결방법:Prisma는 현재 \_count를 직접 정렬하는 기능을 지원하지 않는다는 이야기를 들었다
모든 Posts를 가져오고, 각 Post의 like: true인 개수를 계산하기로 했다.

![](https://velog.velcdn.com/images/jw01987/post/e2acca97-e50c-4c1d-bf93-9a48510e2844/image.png)
