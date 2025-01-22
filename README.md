## 💊 JS 재활치료

### 간단한 CRUD 구현하기

#### 🔧 이용한 툴

`Node.js` `express` `mongoDB` `mongoose`

#### 구현 할 내용 (과제)

1. 전체 게시글 목록 조회 API
   - 제목, 작성자명, 작성 날짜를 조회하기
   - 작성 날짜 기준으로 내림차순 정렬하기
2. 게시글 작성 API
   - 제목, 작성자명, 비밀번호, 작성 내용을 입력하기
3. 게시글 조회 API
   - 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기
     (검색 기능이 아닙니다. 간단한 게시글 조회만 구현해주세요.)
4. 게시글 수정 API
   - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
5. 게시글 삭제 API
   - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
6. 댓글 목록 조회
   - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기
   - 작성 날짜 기준으로 내림차순 정렬하기
7. 댓글 작성
   - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
   - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
8. 댓글 수정
   - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
   - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
9. 댓글 삭제
   - 원하는 댓글을 삭제하기

#### API 명세

| 기능             | method | API path                       |
| ---------------- | ------ | ------------------------------ |
| 게시글 모두 조회 | GET    | /api/post                      |
| 게시글 조회      | GET    | /api/post/:postId              |
| 게시글 작성      | POST   | /api/post                      |
| 게시글 수정      | UPDATE | /api/post/:postId              |
| 게시글 삭제      | DELETE | /api/post/delete               |
| 댓글 조회        | GET    | /api/comment/:postId           |
| 댓글 작성        | POST   | /api/comment                   |
| 댓글 수정        | UPDATE | /api/comment/:commentId        |
| 댓글 삭제        | DELETE | /api/comment/delete/:commentId |
