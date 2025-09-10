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
exports.CreatePaymentService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreatePaymentService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ motoqueiroId, valorPago, quantidadeEntregas, observacao }) {
            if (!motoqueiroId || !valorPago || !quantidadeEntregas) {
                throw new Error("Dados obrigatórios faltando (motoqueiroId, valorPago, quantidadeEntregas)");
            }
            const payment = yield prisma_1.default.pagamento.create({
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
        });
    }
}
exports.CreatePaymentService = CreatePaymentService;
