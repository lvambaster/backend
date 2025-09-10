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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ telefone, password }) {
            // Buscar motoqueiro pelo telefone
            const motoqueiro = yield prisma_1.default.motoqueiro.findFirst({
                where: { telefone },
            });
            if (!motoqueiro) {
                throw new Error("Motoqueiro não encontrado");
            }
            // Verifica senha
            const senhaCorreta = yield (0, bcryptjs_1.compare)(password, motoqueiro.password);
            if (!senhaCorreta) {
                throw new Error("Senha incorreta");
            }
            // Gera token JWT
            const token = (0, jsonwebtoken_1.sign)({
                id: motoqueiro.id,
                name: motoqueiro.name,
            }, process.env.JWT_SECRET, // precisa estar definido no .env
            {
                subject: String(motoqueiro.id),
                expiresIn: "30d", // token expira em 30 dias
            });
            return {
                id: motoqueiro.id,
                name: motoqueiro.name,
                telefone: motoqueiro.telefone,
                token,
            };
        });
    }
}
exports.AuthService = AuthService;
