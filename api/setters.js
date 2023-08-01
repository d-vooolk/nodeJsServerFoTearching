import {dbConnect} from "../helpers/helpers.mjs";

export const updateProfileData = async (dbPath, newData) => {
    try {
        const { id, ...fields } = newData;

        fields.classmates = JSON.stringify(fields.classmates);
        fields.friends = JSON.stringify(fields.friends);
        fields.subscribers = JSON.stringify(fields.subscribers);

        const setClause = Object.keys(fields).map(field => `${field} = ?`).join(', ');
        const values = Object.values(fields);

        const query = `UPDATE profiles SET ${setClause} WHERE id = ?`;
        values.push(id);

        const db = dbConnect(dbPath);

        await db.run(query, values);

        db.close();
    } catch (error) {
        console.error('Ошибка при обновлении данных профиля:', error.message);
        throw new Error('Ошибка при обновлении данных профиля');
    }
};


export const updateUserNews = async (dbPath, newData) => {
    try {
        const db = dbConnect(dbPath);

        await db.run('DELETE FROM userNews');

        const insertStmt = db.prepare('INSERT INTO userNews (text, picture, creationDate, comments) VALUES (?, ?, ?, ?)');
        for (const item of newData) {
            await insertStmt.run(item.text, item.picture, item.creationDate, JSON.stringify(item.comments));
        }
        insertStmt.finalize();

        db.close();
    } catch (error) {
        console.error('Ошибка при обновлении данных новостей:', error.message);
        throw new Error('Ошибка при обновлении данных новостей');
    }
};


export const updateUserMessages = async (dbPath, newData) => {
    try {
        const db = dbConnect(dbPath);

        await db.run('DELETE FROM userMessages');

        const insertStmt = db.prepare('INSERT INTO userMessages (senderName, senderID, senderPhoto, text, sendDate) VALUES (?, ?, ?, ?, ?)');
        for (const item of newData) {
            await insertStmt.run(item.senderName, item.senderID, item.senderPhoto, item.text, item.sendDate);
        }
        insertStmt.finalize();

        db.close();
    } catch (error) {
        console.error('Ошибка при обновлении данных сообщений:', error.message);
        throw new Error('Ошибка при обновлении данных сообщений');
    }
};