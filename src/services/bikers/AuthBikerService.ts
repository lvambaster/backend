import prismaClient from "../../prisma";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
    telefone: string;
    password: string;
}   

class AuthBikerService {
    async execute({telefone, password}: AuthRequest) {
       const biker = await prismaClient.motoqueiro.findFirst({
            where: {
                telefone: telefone
            }
       });

       if(!biker) {
            throw new Error("User/Password incorrect");
         }

         const passwordMatch = await compare(password, biker.password); 
         if(!passwordMatch) {
            throw new Error("User/Password incorrect");
         }


         const token = sign( 
            {
            name: biker.name,
            telefone: biker.telefone
         },
         process.env.JWT_SECRET,
         {
            subject: String(biker.id),
            expiresIn: '30d'
         }
         )
          

        return{
            id: biker.id,
            name: biker.name,
            telefone: biker.telefone,
            token: token
        };
    }
}
export { AuthBikerService }