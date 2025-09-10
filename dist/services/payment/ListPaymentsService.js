"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPaymentsService = void 0;
// services/payment/ListPaymentsService.ts
const prisma_1 = __importDefault(require("../../prisma"));
class ListPaymentsService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ motoqueiroId, startDate, endDate }) {
            const where = {};
            if (motoqueiroId)
                where.motoqueiroId = Number(motoqueiroId);
            if (startDate || endDate)
                where.dataPagamento = {};
            if (startDate)
                where.dataPagamento.gte = new Date(startDate);
            if (endDate) {
                const end = new Date(endDate);
                end.setHours(23, 59, 59, 999); // garante que todo o dia final seja incluído
                where.dataPagamento.lte = end;
            }
            const payments = yield prisma_1.default.pagamento.findMany({
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
        });
    }
}
exports.ListPaymentsService = ListPaymentsService;
