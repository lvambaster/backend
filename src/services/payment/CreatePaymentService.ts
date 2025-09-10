import prismaClient from "../../prisma";

interface PaymentRequest {
  motoqueiroId: number;
  valorPago: number;
  quantidadeEntregas: number;
  observacao?: string;
}

class CreatePaymentService {
  async execute({ motoqueiroId, valorPago, quantidadeEntregas, observacao }: PaymentRequest) {
    if (!motoqueiroId || !valorPago || !quantidadeEntregas) {
      throw new Error("Dados obrigatórios faltando (motoqueiroId, valorPago, quantidadeEntregas)");
    }

    const payment = await prismaClient.pagamento.create({
      data: {
        motoqueiroId,
        valorPago,
        quantidadeEntregas,
        observacao,
      },
      select: {
        id: true,
        valorPago: true,
        quantidadeEntregas: true,
        dataPagamento: true,
        observacao: true,
        motoqueiro: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return payment;
  }
}

export { CreatePaymentService };
