/*
  Warnings:

  - You are about to alter the column `email_verified_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `created_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updated_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `email_verified_at` TIMESTAMP NOT NULL,
    MODIFY `created_at` TIMESTAMP NOT NULL,
    MODIFY `updated_at` TIMESTAMP NOT NULL;

-- CreateTable
CREATE TABLE `Products` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(2000) NOT NULL,
    `image` VARCHAR(2000) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `created_by` BIGINT NOT NULL,
    `updated_by` BIGINT NOT NULL,
    `deleted_by` BIGINT NOT NULL,
    `created_at` TIMESTAMP NOT NULL,
    `updated_at` TIMESTAMP NOT NULL,
    `deleted_at` TIMESTAMP NOT NULL,
    `published` TINYINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
