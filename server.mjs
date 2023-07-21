import { profileData, userNews, userMessages } from "./constants.mjs";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/profile', (req, res) => {
    res.json(profileData);
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
