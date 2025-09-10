// src/controllers/AuthController.ts
import { Request, Response } from "express";
import { AuthService } from "../../services/payment/AuthService";

class AuthController {
  async handle(req: Request, res: Response) {
    const { telefone, password } = req.body;

    const authService = new AuthService();

    try {
      const auth = await authService.execute({ telefone, password });
      return res.json(auth);
    } catch (err: any) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export { AuthController };
