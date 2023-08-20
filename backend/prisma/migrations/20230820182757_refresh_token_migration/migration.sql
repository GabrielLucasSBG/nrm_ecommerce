-- DropForeignKey
ALTER TABLE `refreshtoken` DROP FOREIGN KEY `RefreshToken_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
