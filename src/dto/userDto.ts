import { IsString, IsNotEmpty, Matches } from "class-validator";

export class UserDto {
  @IsString()
  @IsNotEmpty()
  nickname!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;
}
