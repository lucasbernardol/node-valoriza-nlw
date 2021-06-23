import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import mainRoutes from './routes/index.routes';
import usersRoutes from './routes/users.routes';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(mainRoutes);
app.use(usersRoutes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof Error) {
      const { message } = error;

      const httpCode = 400;

      return response.status(httpCode).json({
        error: {
          httpCode,
          message,
        },
      });
    }

    return response.status(500).json({ message: 'Internal server error' });
  }
);

export { app };
