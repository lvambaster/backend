/*
  Warnings:

  - Added the required column `password` to the `Motoqueiro` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Motoqueiro" ADD COLUMN     "password" TEXT NOT NULL;
