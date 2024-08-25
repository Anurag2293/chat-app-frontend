/*
  Warnings:

  - Added the required column `senderType` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SenderType" AS ENUM ('USER', 'BOT', 'SYSTEM', 'GROUP');

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "image" TEXT,
ADD COLUMN     "senderType" "SenderType" NOT NULL;
