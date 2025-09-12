// services/payment/DeletePaymentService.ts
import prismaClient from "../../prisma";

interface DeletePaymentRequest {
  paymentId: number;
}

class DeletePaymentService {
  async execute({ paymentId }: DeletePaymentRequest) {
    // Primeiro busca o pagamento
    const payment = await prismaClient.pagamento.findUnique({
      where: { id: paymentId },
      include: { motoqueiro: true },
    });

    if (!payment) {
      throw new Error("Pagamento não encontrado");
    }

    // Remove o pagamento
    await prismaClient.pagamento.delete({
      where: { id: paymentId },
    });

    // Retorna os dados do pagamento excluído
    return {
      id: payment.id,
      motoqueiroId: payment.motoqueiroId,
      motoqueiroNome: payment.motoqueiro.name,
      valorPago: payment.valorPago,
      quantidadeEntregas: payment.quantidadeEntregas,
      dataPagamento: payment.dataPagamento,
      observacao: payment.observacao,
    };
  }
}

export { DeletePaymentService };
