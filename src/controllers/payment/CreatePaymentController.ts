import { Request, Response } from "express";
import { CreatePaymentService } from "../../services/payment/CreatePaymentService";

class CreatePaymentController {
  async handle(req: Request, res: Response) {
    const { motoqueiroId, valorPago, quantidadeEntregas, observacao } = req.body;

    const createPaymentService = new CreatePaymentService();

    try {
      const payment = await createPaymentService.execute({
        motoqueiroId,
        valorPago,
        quantidadeEntregas,
        observacao,
      });

      return res.json(payment);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreatePaymentController };
