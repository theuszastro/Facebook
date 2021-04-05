import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { join } from 'path';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import 'express-async-errors';
import dotenv from 'dotenv';

import HandlerError from './utils/HandlerError';
import busboyMiddleware from './middlewares/BusboyMiddleware';
import routes from './routes';

dotenv.config({
   path: join(__dirname, '../.env'),
});

dayjs.locale(ptBr);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('file', express.static(join(__dirname, '../uploads')));
app.use(busboyMiddleware);
app.use(routes);
app.use(HandlerError);

export default app;
