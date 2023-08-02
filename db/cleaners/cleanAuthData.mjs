import sqlite3 from "sqlite3";

const dbPath = '../mydatabase.db';

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run('DELETE FROM authData', err => {
        if (err) {
            console.error('Ошибка при очистке таблицы:', err.message);
        } else {
            console.log('Таблица authData успешно очищена');
        }

        db.close();
    });
});
