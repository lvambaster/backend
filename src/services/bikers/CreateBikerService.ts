import prismaClient  from "../../prisma";
import { hash } from 'bcryptjs';

interface BikerRequest {
    name: string;
    telefone: string;
    password: string;
}

class CreateBikerService {
    async execute({ name, telefone, password }: BikerRequest) {

        if(!telefone) {
            throw new Error("phone incorrect")
        }   

        const bikerAlreadyExists = await prismaClient.motoqueiro.findFirst({
            where: { 
                telefone: telefone 
            }
        })

        if(bikerAlreadyExists) {
            throw new Error("Biker already exists")
        }   

        const passwordHash = await hash(password, 8);   
    

        const biker = await prismaClient.motoqueiro.create({
            data: {
                name: name,
                telefone: telefone, 
                password: passwordHash
            },
            select: {
                id: true,
                name: true,
                telefone: true
            }
        })
        console.log(name);

        return biker;
    }
}
export { CreateBikerService }   