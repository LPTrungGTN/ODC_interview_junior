import cors from 'cors';
import express, { type Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import taskRoutes from './api/routes/taskRoutes';
import { errorHandler } from './common/middleware/errorHandler';

const logger = pino({ name: 'server' });
const app: Express = express();

app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.use(express.json());

app.use('/api/tasks', taskRoutes);
app.get('', (req, res) => {
  res.send('Hello World');
});
app.use(errorHandler);

export default app;
