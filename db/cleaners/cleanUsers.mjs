import { dbConnect } from "../../helpers/helpers.mjs";

const dbPath = '../mydatabase.db';
const db = dbConnect(dbPath);

const tableName = 'profiles';

const deleteQuery = `DROP TABLE ${tableName}`; // Измененный запрос

db.run(deleteQuery, function(err) {
    if (err) {
        console.error('Ошибка при удалении таблицы:', err.message);
    } else {
        console.log(`Таблица ${tableName} успешно удалена`);
    }

    db.close();
});
