/*
  Warnings:

  - Added the required column `description` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "profileImage" TEXT;

-- AlterTable
ALTER TABLE "UserRoom" ADD COLUMN     "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
