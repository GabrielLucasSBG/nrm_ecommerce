/*
  Warnings:

  - You are about to drop the column `createdAt` on the `refreshtoken` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `refreshtoken` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `refreshtoken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `refreshtoken` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
