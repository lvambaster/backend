// services/bikers/ListBikersService.ts
import prismaClient from "../../prisma";

export class ListBikersService {
  async execute() {
    const bikers = await prismaClient.motoqueiro.findMany({
      orderBy: { name: "asc" }
    });
    return bikers;
  }
}
