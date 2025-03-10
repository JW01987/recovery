import { PrismaClient, Users } from "@prisma/client";
import { Request } from "express";

export interface AuthRequest extends Request {
  user?: Users;
}
