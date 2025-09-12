// controllers/payment/DeletePaymentController.ts
import { Request, Response } from "express";
import { DeletePaymentService } from "../../services/payment/DeletePaymentService";

class DeletePaymentController {
  async handle(req: Request, res: Response) {
    const id = req.params.id;
    
    try {
      const service = new DeletePaymentService();
      const deletedPayment = await service.execute({ paymentId: Number(id) });

      return res.json({
        message: "Pagamento excluído com sucesso!",
        deletedPayment
      });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { DeletePaymentController };
