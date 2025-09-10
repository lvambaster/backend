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
exports.AuthBikerController = void 0;
const AuthBikerService_1 = require("../../services/bikers/AuthBikerService");
class AuthBikerController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { telefone, password } = req.body;
            const authBikerService = new AuthBikerService_1.AuthBikerService();
            const biker = yield authBikerService.execute({
                telefone,
                password
            });
            return res.json(biker);
        });
    }
}
exports.AuthBikerController = AuthBikerController;
