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
exports.ListPaymentsController = void 0;
const ListPaymentsService_1 = require("../../services/payment/ListPaymentsService");
class ListPaymentsController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { motoqueiroId, startDate, endDate } = req.query;
                const service = new ListPaymentsService_1.ListPaymentsService();
                const payments = yield service.execute({
                    motoqueiroId: motoqueiroId ? Number(motoqueiroId) : undefined,
                    startDate: startDate ? String(startDate) : undefined,
                    endDate: endDate ? String(endDate) : undefined,
                });
                return res.json(payments);
            }
            catch (error) {
                return res.status(400).json({ error: error.message });
            }
        });
    }
}
exports.ListPaymentsController = ListPaymentsController;
