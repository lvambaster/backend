import{ Request, Response } from "express";
import { AuthBikerService } from "../../services/bikers/AuthBikerService";  


class AuthBikerController {
    async handle(req: Request, res: Response) {
        const { telefone, password } = req.body;    
        const authBikerService = new AuthBikerService();
        const biker = await authBikerService.execute({
            telefone,
            password
        });
        return res.json(biker);
    }
}   
export { AuthBikerController }
