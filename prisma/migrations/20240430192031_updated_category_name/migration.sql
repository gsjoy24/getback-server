/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `FoundItemCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FoundItemCategory_name_key" ON "FoundItemCategory"("name");
