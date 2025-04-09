import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "../src/users/users.module";
import { PostsModule } from "./posts/posts.module";
import { CommentsModule } from "./comments/comments.module";
import { LikesModule } from "./likes/likes.module";
import { PrismaService } from "./prisma/prisma.service";

@Module({
  imports: [UsersModule, PostsModule, CommentsModule, LikesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
