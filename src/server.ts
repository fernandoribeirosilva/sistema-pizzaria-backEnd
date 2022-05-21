import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import apiRoutes from './routes/api';

dotenv.config();

const server = express();

server.use(cors());

// para ver a imagem no navegador http://localhost:3000/files/nome da imagem
server.use('/files', express.static(path.join(__dirname, '../public/media')));
server.use(express.urlencoded({ extended: true }));

server.use(passport.initialize());

server.use('/api', apiRoutes);

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status);
    } else {
        res.status(400);
    }

    if (err.message) {
        res.json({ error: err.message });
    } else {
        res.json({ error: 'Ocorreu algum erro.' });
    }
}
server.use(errorHandler);

server.listen(process.env.PORT);