const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const profileData = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 30,
};

app.use(cors());

app.get('/profile', (req, res) => {
    res.json(profileData);
});

app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
