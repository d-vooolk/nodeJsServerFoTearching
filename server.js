const express = require('express');
const cors = require('cors'); // Импорт пакета cors
const app = express();
const port = 3000;

const profileData = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
};

// Используем CORS middleware для разрешения запросов с других доменов
const allowedOrigins = ['localhost:3000', 'localhost', 'http://localhost:63342'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.get('/profile', (req, res) => {
    res.json(profileData);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
