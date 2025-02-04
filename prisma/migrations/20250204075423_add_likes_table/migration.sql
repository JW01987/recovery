/*
  Warnings:

  - You are about to alter the column `nickname` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `password` on the `Users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `SequelizeMeta` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `content` on table `Comments` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `comment_postId_fkey`;

-- DropForeignKey
ALTER TABLE `Comments` DROP FOREIGN KEY `comment_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Posts` DROP FOREIGN KEY `post_userId_fkey`;

-- DropIndex
DROP INDEX `comment_postId_fkey` ON `Comments`;

-- DropIndex
DROP INDEX `comment_userId_fkey` ON `Comments`;

-- DropIndex
DROP INDEX `post_userId_fkey` ON `Posts`;

-- AlterTable
ALTER TABLE `Comments` MODIFY `content` TEXT NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Posts` MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` TEXT NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- AlterTable
ALTER TABLE `Users` MODIFY `nickname` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0);

-- DropTable
DROP TABLE `SequelizeMeta`;

-- CreateTable
CREATE TABLE `Likes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `like` INTEGER NOT NULL DEFAULT 0,
    `userId` INTEGER NOT NULL,
    `postId` INTEGER NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updatedAt` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comments` ADD CONSTRAINT `Comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Posts` ADD CONSTRAINT `Posts_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Likes` ADD CONSTRAINT `Likes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Posts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
