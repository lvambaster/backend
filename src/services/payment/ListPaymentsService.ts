// services/payment/ListPaymentsService.ts
import prismaClient from "../../prisma";

interface ListPaymentsRequest {
  motoqueiroId?: number;
  startDate?: string;
  endDate?: string;
}

class ListPaymentsService {
  async execute({ motoqueiroId, startDate, endDate }: ListPaymentsRequest) {
    const where: any = {};

    if (motoqueiroId) where.motoqueiroId = Number(motoqueiroId);
    if (startDate || endDate) where.dataPagamento = {};

    if (startDate) where.dataPagamento.gte = new Date(startDate);
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // garante que todo o dia final seja incluído
      where.dataPagamento.lte = end;
    }

    const payments = await prismaClient.pagamento.findMany({
      where,
      include: { motoqueiro: true },
      orderBy: { dataPagamento: "desc" },
    });

    return payments.map((p) => ({
      id: p.id,
      motoqueiroId: p.motoqueiroId,
      motoqueiroNome: p.motoqueiro.name,
      valorPago: p.valorPago,
      quantidadeEntregas: p.quantidadeEntregas,
      dataPagamento: p.dataPagamento,
      observacao: p.observacao,
    }));
  }
}

export { ListPaymentsService };
