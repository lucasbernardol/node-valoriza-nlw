import 'dotenv/config';

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import mainRoutes from './routes/index.routes';

const app = express();

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(mainRoutes);

export { app };
