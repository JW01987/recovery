import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class CommentDto {
  @IsNumber()
  @IsNotEmpty()
  postId!: number;

  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class CommentDeleteDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  commentId!: number;
}

export class CommentUpdateDto extends CommentDeleteDto {
  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class CommentCreateDto extends CommentDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;
}
