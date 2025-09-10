-- CreateTable
CREATE TABLE "Motoqueiro" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT,
    "diaria" DOUBLE PRECISION,

    CONSTRAINT "Motoqueiro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pagamento" (
    "id" SERIAL NOT NULL,
    "motoqueiroId" INTEGER NOT NULL,
    "valorPago" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "observacao" TEXT,

    CONSTRAINT "Pagamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pagamento" ADD CONSTRAINT "Pagamento_motoqueiroId_fkey" FOREIGN KEY ("motoqueiroId") REFERENCES "Motoqueiro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
