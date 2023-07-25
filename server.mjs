import { userNews, userMessages } from "./constants.mjs";
import express from 'express';
import cors from 'cors';
import {dbConnect, parseJSONFields} from "./helpers/helpers.mjs";

const app = express();
const port = 3000;
const dbPath = './db/mydatabase.db';

app.use(cors());

app.get('/profile', (req, res) => {
    const query = 'SELECT * FROM profiles WHERE id = ?';
    dbConnect(dbPath).get(query, [1], (err, row) => {
        if (err) {
            console.error('Ошибка при выполнении запроса:', err.message);
            res.status(500).json({ error: 'Ошибка при получении данных из базы данных' });
        } else {
            row = parseJSONFields(row);
            console.log(row);
            res.json(row);
        }
    });
});

app.get('/user-news', (req, res) => {
    res.json(userNews);
});

app.get('/user-messages', (req, res) => {
    res.json(userMessages);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
