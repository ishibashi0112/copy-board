/*
  Warnings:

  - Added the required column `tagId` to the `Contents` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Contents` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Contents` ADD COLUMN `tagId` VARCHAR(191) NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `body` VARCHAR(1000) NOT NULL;

-- CreateTable
CREATE TABLE `Tags` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Contents_tagId_idx` ON `Contents`(`tagId`);
