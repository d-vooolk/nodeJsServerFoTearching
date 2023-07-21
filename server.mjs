import { profileData } from "./constants.mjs";
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/profile', (req, res) => {
    res.json(profileData);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
