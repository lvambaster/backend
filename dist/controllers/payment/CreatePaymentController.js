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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePaymentController = void 0;
const CreatePaymentService_1 = require("../../services/payment/CreatePaymentService");
class CreatePaymentController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { motoqueiroId, valorPago, quantidadeEntregas, observacao } = req.body;
            const createPaymentService = new CreatePaymentService_1.CreatePaymentService();
            try {
                const payment = yield createPaymentService.execute({
                    motoqueiroId,
                    valorPago,
                    quantidadeEntregas,
                    observacao,
                });
                return res.json(payment);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.CreatePaymentController = CreatePaymentController;
