-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('DIRECT', 'GROUP', 'BUSINESS');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "type" "RoomType" NOT NULL DEFAULT 'GROUP';
