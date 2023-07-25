import {profileData} from "../constants.mjs";
import {convertPropertiesToJson, dbConnect} from "../helpers/helpers.mjs";
const dbName = 'mydatabase.db';

const JSONProps = convertPropertiesToJson(profileData);

dbConnect(dbName).run(`CREATE TABLE IF NOT EXISTS profiles (
  id INTEGER PRIMARY KEY,
  gender TEXT,
  age INTEGER,
  name TEXT,
  surname TEXT,
  surname1 TEXT,
  brif TEXT,
  status TEXT,
  city TEXT,
  phone TEXT,
  telegramm TEXT,
  instagramm TEXT,
  twitter TEXT,
  classmates TEXT,
  friends TEXT,
  subscribers TEXT
)`);

const keys = Object.keys(JSONProps);
const values = Object.values(JSONProps);

const placeholders = keys.map(() => '?').join(',');
const insertQuery = `INSERT INTO profiles (${keys.join(',')}) VALUES (${placeholders})`;

dbConnect(dbName).run(insertQuery, values, function(err) {
    if (err) {
        return console.error('Ошибка при добавлении данных:', err.message);
    }
    console.log('Данные успешно добавлены, ID:', this.lastID);
});

dbConnect(dbName).close((err) => {
    if (err) {
        console.error('Ошибка при закрытии соединения с базой данных:', err.message);
    } else {
        console.log('Соединение с базой данных закрыто');
    }
});
