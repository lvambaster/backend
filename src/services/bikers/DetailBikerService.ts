import  prismaClient from "../../prisma";

class DetailBikerService {
    async execute(user_id: string) {

        const biker = await prismaClient.motoqueiro.findFirst({
            where: {
                id: Number(user_id)
            },
            select: {
                id: true,
                name: true,
                telefone: true
            }
            })


        return biker;


    }
       

      
}

export { DetailBikerService };
