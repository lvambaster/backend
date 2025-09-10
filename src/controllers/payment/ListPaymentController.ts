// controllers/payment/ListPaymentsController.ts
import { Request, Response } from "express";
import { ListPaymentsService } from "../../services/payment/ListPaymentsService";

class ListPaymentsController {
  async handle(req: Request, res: Response) {
    try {
      const { motoqueiroId, startDate, endDate } = req.query;
      const service = new ListPaymentsService();
      const payments = await service.execute({
        motoqueiroId: motoqueiroId ? Number(motoqueiroId) : undefined,
        startDate: startDate ? String(startDate) : undefined,
        endDate: endDate ? String(endDate) : undefined,
      });
      return res.json(payments);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { ListPaymentsController };
