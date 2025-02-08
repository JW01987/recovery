/*
  Warnings:

  - You are about to alter the column `like` on the `Likes` table. The data in that column could be lost. The data in that column will be cast from `Int` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `Likes` MODIFY `like` BOOLEAN NOT NULL DEFAULT true;
