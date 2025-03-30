-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assigndedToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assigndedToUserId_fkey` FOREIGN KEY (`assigndedToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
