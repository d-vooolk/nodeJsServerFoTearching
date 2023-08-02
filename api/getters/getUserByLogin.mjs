import sqlite3 from "sqlite3";

export const getUserByLogin = async (dbPath, data) => {
    let db = null;

    try {
        db = new sqlite3.Database(dbPath);
        return await new Promise((resolve, reject) => {
            db.get('SELECT * FROM authData WHERE login = ?', [data.login], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    } catch (error) {
        console.error('Ошибка при поиске пользователя:', error.message);
        throw new Error('Ошибка при поиске пользователя');
    } finally {
        if (db) {
            db.close();
        }
    }
};