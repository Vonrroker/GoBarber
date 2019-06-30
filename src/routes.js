import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authHeader from './app/middlewares/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';

const routes = new Router();
const uploads = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authHeader);

routes.put('/users', UserController.update);
routes.post('/files', uploads.single('file'), FileController.store);

export default routes;
