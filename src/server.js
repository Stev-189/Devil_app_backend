import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { PORT } from './config';
import aouthRouter from './routes/auth.routes';
import citaRouter from './routes/cita.routes';
import helpRouter from './routes/help.routes';

const app = express();

app.set('port', PORT || 3000);

app.use(morgan('dev'));
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.use(express.static('public'));

app.use(aouthRouter);
app.use(citaRouter);
app.use(helpRouter);

export default app;