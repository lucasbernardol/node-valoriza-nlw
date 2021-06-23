import 'dotenv/config';

import express from 'express';
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

export { app };
