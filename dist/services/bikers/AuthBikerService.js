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
exports.AuthBikerService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
class AuthBikerService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ telefone, password }) {
            const biker = yield prisma_1.default.motoqueiro.findFirst({
                where: {
                    telefone: telefone
                }
            });
            if (!biker) {
                throw new Error("User/Password incorrect");
            }
            const passwordMatch = yield (0, bcryptjs_1.compare)(password, biker.password);
            if (!passwordMatch) {
                throw new Error("User/Password incorrect");
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: biker.name,
                telefone: biker.telefone
            }, process.env.JWT_SECRET, {
                subject: String(biker.id),
                expiresIn: '30d'
            });
            return {
                id: biker.id,
                name: biker.name,
                telefone: biker.telefone,
                token: token
            };
        });
    }
}
exports.AuthBikerService = AuthBikerService;
