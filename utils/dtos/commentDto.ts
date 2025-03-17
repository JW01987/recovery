export interface CommentBaseDto {
  content: string;
  userId: number;
}

export interface CommentUpdateDto extends CommentBaseDto {
  commentId: number;
}

export interface CommentDeleteDto {
  commentId: number;
  userId: number;
}

export interface CommentCreateDto extends CommentBaseDto {
  postId: number;
}
