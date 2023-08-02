import { profileData } from "./constants.mjs";
import { convertPropertiesToJson, dbConnect } from "../helpers/helpers.mjs";

const dbPath = 'mydatabase.db';
const db = dbConnect(dbPath);

const JSONProps = convertPropertiesToJson(profileData);

db.run(`CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY,
  gender TEXT,
  age INTEGER,
  name TEXT,
  secondName TEXT,
  surname TEXT,
  aboutMe TEXT,
  status TEXT,
  city TEXT,
  phoneNumber TEXT,
  telegram TEXT,
  instagram TEXT,
  twitter TEXT,
  friends TEXT,
  subscribers TEXT
)`, (err) => {
    if (err) {
        return console.error('Ошибка при создании таблицы profiles:', err.message);
    }

    insertProfileData();
});

function insertProfileData() {
    const keys = Object.keys(JSONProps);
    const values = Object.values(JSONProps);

    const placeholders = keys.map(() => '?').join(',');
    const insertQuery = `INSERT INTO profiles (${keys.join(',')}) VALUES (${placeholders})`;

    db.run(insertQuery, values, function(err) {
        if (err) {
            return console.error('Ошибка при добавлении данных:', err.message);
        }
        console.log('Данные успешно добавлены, ID:', this.lastID);

        closeDatabase();
    });
}

function closeDatabase() {
    db.close((err) => {
        if (err) {
            console.error('Ошибка при закрытии соединения с базой данных:', err.message);
        } else {
            console.log('Соединение с базой данных закрыто');
        }
    });
}
