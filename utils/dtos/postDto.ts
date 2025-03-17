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
