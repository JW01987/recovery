import { PrismaClient, Users } from "@prisma/client";
import { Request } from "express";
import { RequestBodyT, RequestParamsT } from "./requestType";

export interface AuthRequest<P = {}, Q = {}, B = {}> extends Request<P, Q, B> {
  user?: Users;
}
