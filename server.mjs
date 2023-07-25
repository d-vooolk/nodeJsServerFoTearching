import { userNews, userMessages } from "./constants.mjs";
import express from 'express';
import cors from 'cors';
import {handleRequest} from "./helpers/helpers.mjs";

const app = express();
const port = 80;
const dbPath = './db/mydatabase.db';

app.use(cors());

app.get('/profile', async (req, res) => {
    const url = req.url;
    const data = await handleRequest(url, dbPath);
    res.json(data);
});

app.get('/user-news', async (req, res) => {
    const url = req.url;
    const data = await handleRequest(url, dbPath);
    res.json(data);
});

app.get('/user-messages', (req, res) => {
    res.json(userMessages);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
