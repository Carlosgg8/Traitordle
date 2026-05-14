/*
  Warnings:

  - A unique constraint covering the columns `[name,seasonId]` on the table `CastMember` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CastMember_name_seasonId_key" ON "CastMember"("name", "seasonId");
