/*
  Warnings:

  - Added the required column `quantidadeEntregas` to the `Pagamento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Pagamento" ADD COLUMN     "quantidadeEntregas" INTEGER NOT NULL;
