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
exports.AuthController = void 0;
const AuthService_1 = require("../../services/payment/AuthService");
class AuthController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { telefone, password } = req.body;
            const authService = new AuthService_1.AuthService();
            try {
                const auth = yield authService.execute({ telefone, password });
                return res.json(auth);
            }
            catch (err) {
                return res.status(400).json({ error: err.message });
            }
        });
    }
}
exports.AuthController = AuthController;
