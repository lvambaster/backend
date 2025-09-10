import { Request, Response, response } from "express";
import { CreateBikerService } from "../../services/bikers/CreateBikerService";

class CreateControllerBiker{
    async handle(req: Request, res: Response) {
        const { name, telefone, password } = req.body;
        
        const createBikerService = new CreateBikerService();
        
        const biker = await createBikerService.execute({ 
            name, 
            telefone,
            password
         });


    return res.json(biker)
}   

}

export { CreateControllerBiker }    