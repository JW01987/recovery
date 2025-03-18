import { Users } from "@prisma/client";
import { Request } from "express";

export interface AuthRequest<P = {}, Q = {}, B = {}> extends Request<P, Q, B> {
  user?: Users;
}
