import {Router} from 'express';
import { CreateControllerBiker } from './controllers/bikers/CreateControllerBiker';
import { AuthBikerController } from './controllers/bikers/AuthBikerController';
import { DetailBikerController } from './controllers/bikers/DetailBikerController';
import { CreatePaymentController } from './controllers/payment/CreatePaymentController';
import { DetailPaymentController } from './controllers/payment/DetailPaymentController';
import { AuthController } from './controllers/payment/AuthController';

import { ListBikersController } from './controllers/bikers/ListBikersController';
import { ListPaymentsController } from './controllers/payment/ListPaymentController';

import { DeletePaymentController } from './controllers/payment/DeletePaymentController';

import { isAuthenticated } from './middleware/isAuthenticated';



const router = Router();


/--rota user biker(motoqueiro)--/
router.post('/bikers', new CreateControllerBiker().handle);

router.get('/bikers', new ListBikersController().handle);


router.post('/session', new AuthBikerController().handle);

router.get('/me', isAuthenticated, new DetailBikerController().handle);

/--rota pagamento(motoqueiro)--/

router.post('/payment',  new CreatePaymentController().handle);

router.get('/payments/:id', new DetailPaymentController().handle);


router.get('/payments', isAuthenticated, new ListPaymentsController().handle);

router.post('/login', new AuthController().handle);

router.delete('/payment/:id', isAuthenticated, new DeletePaymentController().handle);



export { router }; 