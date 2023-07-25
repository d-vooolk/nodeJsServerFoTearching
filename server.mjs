import express from 'express';
import cors from 'cors';
import {routes} from "./routes/routes.mjs";

const app = express();
const port = 80;
const dbPath = './db/mydatabase.db';

app.use(cors());
app.use(express.json());

routes(app, dbPath);

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
