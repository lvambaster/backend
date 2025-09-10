import { Request, Response } from "express";
import { DetailPaymentService } from "../../services/payment/DetailPaymentService";

class DetailPaymentController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const detailPaymentService = new DetailPaymentService();

    try {
      const payment = await detailPaymentService.execute(id);
      return res.json(payment);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DetailPaymentController };
