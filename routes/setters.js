import {dbConnect} from "../helpers/helpers.mjs";

export const updateProfileData = async (dbPath, newData) => {
    const { id, ...fields } = newData;

    const setClause = Object.keys(fields).map(field => `${field} = ?`).join(', ');
    const values = Object.values(fields);

    const query = `UPDATE profiles SET ${setClause} WHERE id = ?`;
    values.push(id);

    const db = dbConnect(dbPath);

    await db.run(query, values);

    db.close();
};


export const updateUserNews = async (dbPath, newData) => {
    try {
        const db = dbConnect(dbPath);

        // Удаляем старые данные из таблицы userNews
        await db.run('DELETE FROM userNews');

        // Вставляем новые данные в таблицу userNews
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

        // Удаляем старые данные из таблицы userMessages
        await db.run('DELETE FROM userMessages');

        // Вставляем новые данные в таблицу userMessages
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