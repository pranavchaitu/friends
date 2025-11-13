/*
  Warnings:

  - You are about to drop the column `profileUrl` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "profileUrl",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "gender" "Gender",
ADD COLUMN     "hobbies" TEXT[],
ADD COLUMN     "images" TEXT[];
