import { createServer } from 'http';
import { app, router } from './app';
import { initialiseRouters } from './router';
import { connectToMongoDb } from './db';
connectToMongoDb();
initialiseRouters(router);

const server = createServer(app);
export { server };
