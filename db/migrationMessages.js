import {userMessages} from "./constants.mjs";
import {dbConnect} from "../helpers/helpers.mjs";

const dbPath = './mydatabase.db';
const db = dbConnect(dbPath);

db.run(`
      CREATE TABLE IF NOT EXISTS userMessages (
        senderName TEXT,
        senderID INTEGER,
        senderPhoto TEXT,
        text TEXT,
        sendDate TEXT
      )`, (err) => {
    if (err) {
        console.error('Ошибка при создании таблицы userMessages:', err.message);
    } else {
        console.log('Таблица userMessages успешно создана');
        userMessages.forEach((message) => {
            const {senderName, senderID, senderPhoto, text, sendDate} = message;
            db.run(`
            INSERT INTO userMessages (senderName, senderID, senderPhoto, text, sendDate)
            VALUES (?, ?, ?, ?, ?)`, [senderName, senderID, senderPhoto, text, sendDate], (err) => {
                if (err) {
                    console.error('Ошибка при внесении данных в таблицу userMessages:', err.message);
                } else {
                    console.log('Данные успешно внесены в таблицу userMessages');
                }
            });
        });
    }
});

db.close((err) => {
    if (err) {
        console.error('Ошибка при закрытии базы данных:', err.message);
    } else {
        console.log('База данных успешно закрыта');
    }
});

