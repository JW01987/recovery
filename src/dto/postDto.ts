import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class PostDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;
}

export class UpdatePostDto extends PostDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  postId!: number;
}

export class CreatePostDto extends PostDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;
}
