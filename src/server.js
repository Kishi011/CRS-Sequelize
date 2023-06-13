import 'dotenv/config';
import Express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { Routes } from './routes';
require('./models');

const porta = process.env.PORTA_API;
const app = Express();

// controle dos logs do sistema
const accesLogStream = fs.createWriteStream(
  // __dirname ==> variavel de ambiente para pegar o caminho do arquivo
  path.join(__dirname, '../acces.log'), // cria o arquivo de logs
  {flags: 'a'} // caso o arquivo nao tenha sido criado ele força a criação
);

const corsOptions = {
  origin: function (origin, callback) {
    callback(null, true)
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true
}

app.use(cors(corsOptions));
app.use(Express.json({ limit: '50mb' }));
app.use(morgan('combined', { stream: accesLogStream }));

Routes(app);

// operação padrão caso a api não encontre a rota definida
app.use((_, res) => {
  return res.status(404).send({
    message: 'Não foi encontrado vossa página' 
  });
});

app.listen(porta, () => console.log(`Server rodando na porta: ${porta}`));
