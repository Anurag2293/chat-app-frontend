-- CreateTable
CREATE TABLE "RoomLink" (
    "id" TEXT NOT NULL,
    "roomID" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usageCount" INTEGER NOT NULL,

    CONSTRAINT "RoomLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoomLink_roomID_key" ON "RoomLink"("roomID");

-- AddForeignKey
ALTER TABLE "RoomLink" ADD CONSTRAINT "RoomLink_roomID_fkey" FOREIGN KEY ("roomID") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
