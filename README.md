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

[1. Request 타입을 지정하는 문제](https://velog.io/@jw01987/TS%EC%97%90%EC%84%9C-%ED%83%80%EC%9E%85%EC%A7%80%EC%A0%95%ED%95%A0%EB%95%8C%EB%8A%94-%EC%B6%9C%EC%B2%98%EB%A5%BC-%ED%99%95%EC%8B%A4%ED%9E%88)

2. 커스텀 리퀘스트타입이 제네릭을 안 받을때

[3. DTO를 만들어 관리해보자](https://velog.io/@jw01987/DTO%EB%A5%BC-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B4%85%EC%8B%9C%EB%8B%A4)

4. process.env.KEY_USER 오버로드를 찾을 수 없대요
   process.env.KEY_USER! 로 해결
   ! (type assertion)은 값이 undefined가 되지 않을 것임을 컴파일러에 알리는 데 사용됩니다. 예를 들어, 변수의 유형은 "string | undefined | null"일 수 있습니다. 이 변수를 할당하려고 하면 컴파일러는 값이 null이거나 정의되지 않을 수 있다고 불평할 것이므로 !(type assertion)을 이용해서 null 이나 undefined가 아님을 책임을 지고 컴파일러에게 해당 검사를 무시하거나 제거하도록 지시합니다. 그래서 이 문제를 해결할 수 있습니다. 감사합니다.

5. 리퀘스트 데이터 타입의 코드 개선

요청 데이터의 타입을 명확히 구분하기 어렵고 모호한 부분이 존재
AuthRequest타입에 제네릭으로 dto를 적용하여 기존의 코드를 개선

```ts
// 기존 제네릭 타입
export interface RequestBodyT {
  user?: Users;
  title?: string;
  content?: string;
  nickname?: string;
  password?: string;
  postId?: number;
}

export interface RequestParamsT {
  userId?: number;
  postId?: number;
  commentId?: number;
}
```

```ts
//매개변수로 사용하던 타입들을 AuthRequest 제네릭으로 사용
export interface PostBaseDto {
  userId: number;
}
export interface UpdatePostDto extends PostBaseDto {
  title: string;
  content: string;
  postId: number;
}
export interface DeletePostDto extends PostBaseDto {
  postId: number;
}

export interface CreatePostDto extends PostBaseDto {
  title: string;
  content: string;
}


////

 commentUpdate = async (
    req: AuthRequest<CommentUpdateDto, {}, CommentUpdateDto>,
    res: Response,
    next: NextFunction
  ) => {
```

커스텀 리퀘스트랑 리퀘스트 핸들러랑 충돌

1. 커스텀 리퀘스트대신 걍 리퀘스트 확장해봄 (안됨)
2. 함수 반환이 문제인것 같아서 반환을 void로 바꿈 (안됨)
3. 파라미터 타입을 직접 입력함 (해결)
   Request<{ commentId: string }>가 되는 이유

req.params.commentId는 항상 string 타입이므로 { commentId: string }을 지정해야 함.
만약 number로 사용하고 싶다면, Number(req.params.commentId)로 변환하면 됨.
✅ 🚀 Request<CommentDeleteDto>가 안 되는 이유
req.params.commentId는 string인데, CommentDeleteDto.commentId는 number라서 TypeScript가 타입 불일치 오류를 발생시킴.

3-1 커스텀 리퀘스트를 다시 써봄 -> 정상 작동함 -> 기존거 확장보다는 새로 타입 만들어 쓰는게 안전할것같아서 커스텀 리퀘스트타입 사용
