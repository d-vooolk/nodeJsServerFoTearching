import {userNews} from "../constants.mjs";
import {dbConnect} from "../helpers/helpers.mjs";

const dbName = 'mydatabase.db';

dbConnect(dbName).run(`
    CREATE TABLE IF NOT EXISTS userNews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      picture TEXT NOT NULL,
      creationDate TEXT NOT NULL,
      comments TEXT
    )
  `);

userNews.forEach(news => {
    const {text, picture, creationDate, comments} = news;
    dbConnect(dbName).run(`
      INSERT INTO userNews (text, picture, creationDate, comments)
      VALUES (?, ?, ?, ?)
    `, [text, picture, creationDate, JSON.stringify(comments)]);
});

dbConnect(dbName).close((err) => {
    if (err) {
        console.error('Ошибка при закрытии базы данных:', err.message);
    } else {
        console.log('Миграция успешно выполнена!');
    }
});
