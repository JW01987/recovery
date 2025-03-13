import { Users } from "@prisma/client";

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
