import { userNews } from "./constants.mjs";
import { dbConnect } from "../helpers/helpers.mjs";

const dbPath = 'mydatabase.db';
const db = dbConnect(dbPath);

db.run(`
    CREATE TABLE IF NOT EXISTS userNews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      picture TEXT NOT NULL,
      creationDate TEXT NOT NULL,
      comments TEXT
    )
  `, (err) => {
    if (err) {
        console.error('Ошибка при создании таблицы userNews:', err.message);
    } else {
        console.log('Таблица userNews успешно создана');
        insertUserNews();
    }
});

function insertUserNews() {
    const totalNews = userNews.length;
    let completedCount = 0;

    userNews.forEach(news => {
        const { text, picture, creationDate, comments } = news;
        db.run(`
          INSERT INTO userNews (text, picture, creationDate, comments)
          VALUES (?, ?, ?, ?)
        `, [text, picture, creationDate, JSON.stringify(comments)], (err) => {
            if (err) {
                console.error('Ошибка при внесении данных в таблицу userNews:', err.message);
            } else {
                completedCount++;
                console.log(`Добавлено новостей: ${completedCount}/${totalNews}`);
                if (completedCount === totalNews) {
                    closeDatabase();
                }
            }
        });
    });
}

function closeDatabase() {
    db.close((err) => {
        if (err) {
            console.error('Ошибка при закрытии базы данных:', err.message);
        } else {
            console.log('Миграция успешно выполнена!');
        }
    });
}
