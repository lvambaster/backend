import  { Request, Response } from 'express';
import { DetailBikerService } from '../../services/bikers/DetailBikerService';  

class DetailBikerController {
    async handle(req: Request, res: Response) {

        const user_id = req.user_id;

        console.log("ID DO USER: ", user_id);

        const detailBikerService = new DetailBikerService();

        const biker = await detailBikerService.execute(user_id);

        return res.json(biker);
    }
}   
export { DetailBikerController }
