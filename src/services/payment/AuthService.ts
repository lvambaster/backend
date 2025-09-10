import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

interface AuthRequest {
  telefone: string;
  password: string;
}

class AuthService {
  async execute({ telefone, password }: AuthRequest) {
    // Buscar motoqueiro pelo telefone
    const motoqueiro = await prismaClient.motoqueiro.findFirst({
      where: { telefone },
    });

    if (!motoqueiro) {
      throw new Error("Motoqueiro não encontrado");
    }

    // Verifica senha
    const senhaCorreta = await compare(password, motoqueiro.password);
    if (!senhaCorreta) {
      throw new Error("Senha incorreta");
    }

    // Gera token JWT
    const token = sign(
      {
        id: motoqueiro.id,
        name: motoqueiro.name,
      },
      process.env.JWT_SECRET as string, // precisa estar definido no .env
      {
        subject: String(motoqueiro.id),
        expiresIn: "30d", // token expira em 30 dias
      }
    );

    return {
      id: motoqueiro.id,
      name: motoqueiro.name,
      telefone: motoqueiro.telefone,
      token,
    };
  }
}

export { AuthService };
