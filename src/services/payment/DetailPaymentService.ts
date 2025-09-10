import prismaClient from "../../prisma";

class DetailPaymentService {
  async execute(payment_id: string) {
    const idNumber = Number(payment_id);
    if (isNaN(idNumber)) {
      throw new Error("ID do pagamento é inválido");
    }

    const payment = await prismaClient.pagamento.findUnique({
      where: { id: idNumber },
      select: {
        id: true,
        valorPago: true,
        quantidadeEntregas: true,
        observacao: true,
        dataPagamento: true,
        motoqueiro: {
          select: {
            id: true,
            name: true,
            telefone: true,
          },
        },
      },
    });

    if (!payment) {
      throw new Error("Pagamento não encontrado");
    }

    return payment;
  }
}

export { DetailPaymentService };
