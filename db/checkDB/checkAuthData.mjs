import sqlite3 from "sqlite3";

const dbPath = '../mydatabase.db';

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.all('SELECT * FROM authData', (err, rows) => {
        if (err) {
            console.error('Ошибка при получении данных:', err.message);
            return;
        }

        console.log('Все данные из таблицы authData:', rows);
    });
});

db.close();
