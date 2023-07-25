import express from 'express';
import cors from 'cors';
import {getRoutes} from "./routes/getRoutes.mjs";

const app = express();
const port = 80;
const dbPath = './db/mydatabase.db';

app.use(cors());
app.use(express.json());

getRoutes(app, dbPath);

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
