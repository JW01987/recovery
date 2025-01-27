## 💊 JS 재활치료

### 인증과 인가

#### 🔧 이용한 툴

`Node.js` `express` `mongoDB` `mongoose`

#### 구현 할 내용 (과제)

1. 회원가입 기능(쿠키, JWT사용)
   1. 회원 가입 API
      - 닉네임, 비밀번호, 비밀번호 확인을 **request**에서 전달받기
      - 닉네임은 `최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)`로 구성하기
      - 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
      - 비밀번호 확인은 비밀번호와 정확하게 일치하기
      - 데이터베이스에 존재하는 닉네임을 입력한 채 회원가입 버튼을 누른 경우 "중복된 닉네임입니다." 라는 에러메세지를 **response**에 포함하기
   2. 로그인 API
      - 닉네임, 비밀번호를 **request**에서 전달받기
      - 로그인 버튼을 누른 경우 닉네임과 비밀번호가 데이터베이스에 등록됐는지 확인한 뒤, 하나라도 맞지 않는 정보가 있다면 "닉네임 또는 패스워드를 확인해주세요."라는 에러 메세지를 **response**에 포함하기
      - 로그인 성공 시, 로그인에 성공한 유저의 정보를 JWT를 활용하여 클라이언트에게 Cookie로 전달하기
2. 이전 과제 수정 (로그인 여부 확인)
   1. 전체 게시글 목록 조회 API
      - 제목, 작성자명(nickname), 작성 날짜를 조회하기
      - 작성 날짜 기준으로 내림차순 정렬하기
   2. 게시글 작성 API
      - 토큰을 검사하여, 유효한 토큰일 경우에만 게시글 작성 가능
      - ~~제목, 작성자명, 비밀번호, 작성 내용을 입력하기~~
      - 제목, 작성 내용을 입력하기
   3. 게시글 조회 API
      - 제목, 작성자명(nickname), 작성 날짜, 작성 내용을 조회하기
        (검색 기능이 아닙니다. 간단한 게시글 조회만 구현해주세요.)
   4. 게시글 수정 API
      - 토큰을 검사하여, 해당 사용자가 작성한 게시글만 수정 가능
      - ~~API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기~~
   5. 게시글 삭제 API
      - 토큰을 검사하여, 해당 사용자가 작성한 게시글만 삭제 가능
      - ~~API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기~~
   6. 댓글 작성 API
      - 로그인 토큰을 검사하여, 유효한 토큰일 경우에만 댓글 작성 가능
      - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
      - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
   7. 댓글 수정 API
      - 로그인 토큰을 검사하여, 해당 사용자가 작성한 댓글만 수정 가능
      - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
      - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
   8. 댓글 삭제 API
      - 로그인 토큰을 검사하여, 해당 사용자가 작성한 댓글만 삭제 가능
      - 원하는 댓글을 삭제하기

#### API 명세

| 기능             | method | API path                       |
| ---------------- | ------ | ------------------------------ |
| 회원가입         | POST   | /api/register                  |
| 로그인           | POST   | /api/login                     |
| 게시글 모두 조회 | GET    | /api/postAll                   |
| 게시글 조회      | GET    | /api/post                      |
| 게시글 작성      | POST   | /api/post                      |
| 게시글 수정      | UPDATE | /api/post/update/:postId       |
| 게시글 삭제      | DELETE | /api/post/delete/:postId       |
| 댓글 조회        | GET    | /api/comment                   |
| 댓글 작성        | POST   | /api/comment                   |
| 댓글 수정        | UPDATE | /api/comment/update/:commentId |
| 댓글 삭제        | DELETE | /api/comment/delete/:commentId |
