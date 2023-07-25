import {dbConnect, parseJSONFields} from "../helpers/helpers.mjs";

const executeQuery = async (dbPath, query, params = []) => {
    return new Promise((resolve, reject) => {
        dbConnect(dbPath).all(query, params, (err, rows) => {
            if (err) {
                console.error('Ошибка при выполнении запроса:', err.message);
                reject({ error: 'Ошибка при получении данных из базы данных' });
            } else {
                resolve(rows);
            }
        });
    });
};

export const handleRequest = async (url, dbPath) => {
    switch (url) {
        case '/profile': {
            const query = 'SELECT * FROM profiles WHERE id = ?';
            try {
                const row = await executeQuery(dbPath, query, [1]);
                return row ? parseJSONFields(row) : { error: 'Данные не найдены' };

            } catch (error) {
                return error;
            }
        }

        case '/user-news': {
            const query = 'SELECT * FROM userNews';
            try {
                const rows = await executeQuery(dbPath, query);
                return rows && rows.length > 0 ? rows.map(row => parseJSONFields(row)) : { error: 'Данные не найдены' }
            } catch (error) {
                return error;
            }
        }

        case '/user-messages': {
            const query = 'SELECT * FROM userMessages';
            try {
                const rows = await executeQuery(dbPath, query);
                return rows && rows.length > 0 ? rows.map(row => parseJSONFields(row)) : { error: 'Данные не найдены' };
            } catch (error) {
                return error;
            }
        }

        default:
            return { error: 'Неверный URL' };
    }
};