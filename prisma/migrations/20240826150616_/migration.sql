/*
  Warnings:

  - A unique constraint covering the columns `[joinLink]` on the table `RoomLink` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `joinLink` to the `RoomLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomLink" ADD COLUMN     "joinLink" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RoomLink_joinLink_key" ON "RoomLink"("joinLink");
