import express from 'express';
import http from 'http';

import cors from 'cors';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';

import { Server } from 'socket.io';

import path from 'path';

import './database/connection';
import 'express-async-errors';

import dayjs from 'dayjs';
import ptBr from 'dayjs/locale/pt-br';

import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import Busboy from 'busboy';

import Errors from './Errors';
import routes from './routes';

import SocketController from './controllers/SocketControllers/SocketController';
import BusboyActions from './utils/Classes/bosboyActions';

dayjs.locale(ptBr);
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

const app = express();

const server = http.createServer(app);
const io = new Server(server, { cors: { methods: ['*'], allowedHeaders: ['*'] } });

new SocketController().registerEvents();

const rateLimit = RateLimit({
   max: 40,
   windowMs: 1000 * 60 * 10,
   keyGenerator: (req, res) => req.ip,
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use('/file', express.static(path.join(__dirname, '..', 'uploads')));
app.use((req, res, next) => {
   const headerType = req.headers['content-type'];
   const headerCond = headerType ? headerType.includes('multipart/form-data') : false;

   if ((req.method === 'POST' && headerCond) || (req.method === 'PUT' && headerCond)) {
      const busboy = new Busboy({ headers: req.headers });

      let files: Array<{ filename: string; isVideo: boolean }> = [];

      busboy.on('file', (_, file, __, ___, mimetype) =>
         BusboyActions.onFile(file, mimetype, files, res)
      );
      busboy.on('field', (field, value) => BusboyActions.onField(field, value, req));
      busboy.on('finish', () => BusboyActions.onFinish(files, req, next));

      req.pipe(busboy);
   } else {
      next();
   }
});
app.use(rateLimit, routes);
app.use(Errors);

server.listen(3333);

export { io };
