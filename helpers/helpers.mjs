import sqlite3 from "sqlite3";
import {userMessages, userNews} from "../constants.mjs";

export const dbConnect = (path) => new sqlite3.Database(path, (err) => {
    if (err) {
        console.error('Ошибка при подключении к базе данных:', err.message);
    } else {
        console.log('Успешное подключение к базе данных');
    }
});


export const parseJSONFields = (data) => {
    for (const key in data) {
        if (typeof data[key] === 'string') {
            if (data[key].startsWith('{') || data[key].startsWith('[')) {
                try {
                    data[key] = JSON.parse(data[key]);
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                }
            }
        } else if (typeof data[key] === 'object') {
            data[key] = parseJSONFields(data[key]);
        }
    }
    return data;
}



export const convertPropertiesToJson = (obj) => {
    for (const prop in obj) {
        if (Array.isArray(obj[prop]) || typeof obj[prop] === 'object') {
            obj[prop] = JSON.stringify(obj[prop]);
        }
    }
    return obj;
}


export const handleRequest = async (url, dbPath) => {
    switch (url) {
        case '/profile': {
            const query = 'SELECT * FROM profiles WHERE id = ?';
            try {
                const row = await new Promise((resolve, reject) => {
                    dbConnect(dbPath).get(query, [1], (err, row) => {
                        if (err) {
                            console.error('Ошибка при выполнении запроса:', err.message);
                            reject({ error: 'Ошибка при получении данных из базы данных' });
                        } else {
                            resolve(row);
                        }
                    });
                });

                if (row) {
                    return parseJSONFields(row);
                } else {
                    return { error: 'Данные не найдены' };
                }
            } catch (error) {
                return error;
            }
        }

        case '/user-news': {
            const query = 'SELECT * FROM userNews';
            try {
                const rows = await new Promise((resolve, reject) => {
                    dbConnect(dbPath).all(query, [], (err, rows) => {
                        if (err) {
                            console.error('Ошибка при выполнении запроса:', err.message);
                            reject({ error: 'Ошибка при получении данных из базы данных' });
                        } else {
                            resolve(rows);
                        }
                    });
                });

                if (rows && rows.length > 0) {
                    return rows.map(row => parseJSONFields(row));
                } else {
                    return { error: 'Данные не найдены' };
                }
            } catch (error) {
                return error;
            }
        }


        case '/user-messages':
            return userMessages;

        default:
            return { error: 'Неверный URL' };
    }
}

