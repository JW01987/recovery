import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class LikeDto {
  @IsNumber()
  @IsNotEmpty()
  userId!: number;

  @IsNumber()
  @IsNotEmpty()
  postId!: number;
}
