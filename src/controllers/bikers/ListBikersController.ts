// controllers/bikers/ListBikersController.ts
import { Request, Response } from "express";
import { ListBikersService } from "../../services/bikers/ListBikersService";

export class ListBikersController {
  async handle(req: Request, res: Response) {
    try {
      const service = new ListBikersService();
      const bikers = await service.execute();
      return res.json(bikers);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao buscar motoqueiros" });
    }
  }
}
