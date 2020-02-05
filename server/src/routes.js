import { Router } from 'express';

import EntregaController from './app/controllers/EntregaController';
import EntregaStore from './app/validators/EntregaStore';
const routes = new Router();
routes.get('/entrega', EntregaController.index);
routes.get('/entrega/:id', EntregaController.index);
routes.post('/entrega',EntregaStore, EntregaController.store);

export default routes;
