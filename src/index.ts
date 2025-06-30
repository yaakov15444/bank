import express, { Express, Request, Response } from 'express';
const app: Express = express();
import cors from 'cors';
import router from './routes/indexRoute';
app.use(cors());
app.use(express.json());
import Dotenv from './secrets/Dotenv';
import { connectToMongo } from './db/mongoConnection';
import loggerMiddleware from './middleware/logger.middleware';
connectToMongo();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Scalable World!');
});
app.use(loggerMiddleware);
app.use('/api', router);
// Start the server and listen for incoming requests
app.listen(Dotenv.port, () => {
  console.log(`🚀 Server is running on http://localhost:${Dotenv.port}`);
});