/*
  Warnings:

  - You are about to drop the column `distinguishingFeatures` on the `Claim` table. All the data in the column will be lost.
  - You are about to drop the column `foundItemName` on the `FoundItem` table. All the data in the column will be lost.
  - Added the required column `description` to the `Claim` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foundDate` to the `FoundItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemName` to the `FoundItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Claim" DROP COLUMN "distinguishingFeatures",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FoundItem" DROP COLUMN "foundItemName",
ADD COLUMN     "foundDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isReturned" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "itemName" TEXT NOT NULL,
ADD COLUMN     "pictures" TEXT[];

-- CreateTable
CREATE TABLE "LostItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "itemName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "lostDate" TIMESTAMP(3) NOT NULL,
    "pictures" TEXT[],
    "isFound" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LostItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LostItem" ADD CONSTRAINT "LostItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LostItem" ADD CONSTRAINT "LostItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "FoundItemCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
