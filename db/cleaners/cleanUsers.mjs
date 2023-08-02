import {dbConnect} from "../../helpers/helpers.mjs";

const dbPath = '../mydatabase.db';
const db = dbConnect(dbPath);

const tableName = 'profiles';

const deleteQuery = `DELETE FROM ${tableName}`;

db.run(deleteQuery, function(err) {
    if (err) {
        console.error('Ошибка при удалении данных:', err.message);
    } else {
        console.log(`Данные из таблицы ${tableName} успешно удалены`);
    }

    db.close();
});
