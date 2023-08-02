import {dbConnect, parseJSONFields} from "../helpers/helpers.mjs";
import {GET_PROFILE_DATA, GET_USER_MESSAGES, GET_USER_NEWS} from "./constants.mjs";

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

export const getters = async (url, dbPath) => {
    switch (url) {
        case GET_PROFILE_DATA: {
            const query = 'SELECT * FROM profiles';
            try {
                const rows = await executeQuery(dbPath, query);
                if (rows.length > 0) {
                    return rows.map(row => parseJSONFields(row));
                } else {
                    return { error: 'Данные не найдены' };
                }
            } catch (error) {
                return error;
            }
        }

        case GET_USER_NEWS: {
            const query = 'SELECT * FROM userNews';
            try {
                const rows = await executeQuery(dbPath, query);
                return rows && rows.length > 0 ? rows.map(row => parseJSONFields(row)) : { error: 'Данные не найдены' }
            } catch (error) {
                return error;
            }
        }

        case GET_USER_MESSAGES: {
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