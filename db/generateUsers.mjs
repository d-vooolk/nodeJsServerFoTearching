import {dbConnect, generateRandomUser} from "../helpers/helpers.mjs";

const dbPath = 'mydatabase.db';
const db = dbConnect(dbPath);

db.run(`
    CREATE TABLE IF NOT EXISTS profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      avatar TEXT,
      gender TEXT,
      age INTEGER,
      name TEXT,
      secondName TEXT,
      aboutMe TEXT,
      status TEXT,
      city TEXT,
      phoneNumber TEXT,
      telegram TEXT,
      instagram TEXT,
      twitter TEXT,
      friends TEXT,
      subscribers TEXT
    )
  `, (err) => {
    if (err) {
        console.error('Ошибка при создании таблицы profiles:', err.message);
    } else {
        console.log('Таблица profiles успешно создана');
        insertUsers();
    }
});

function insertUsers() {
    const numberOfUsers = 100;
    let completedCount = 0;

    for (let i = 0; i < numberOfUsers; i++) {
        const user = generateRandomUser();
        const query = `
          INSERT INTO profiles (
            avatar, gender, age, name, secondName, aboutMe, status,
            city, phoneNumber, telegram, instagram, twitter,
            friends, subscribers
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            user.avatar,
            user.gender,
            user.age,
            user.name,
            user.secondName,
            user.aboutMe,
            user.status,
            user.city,
            user.phoneNumber,
            user.telegram,
            user.instagram,
            user.twitter,
            JSON.stringify(user.friends),
            JSON.stringify(user.subscribers)
        ];

        db.run(query, values, (err) => {
            if (err) {
                console.error('Ошибка при вставке данных:', err.message);
            } else {
                completedCount++;
                console.log(`Добавлено пользователей: ${completedCount}/${numberOfUsers}`);
                if (completedCount === numberOfUsers) {
                    closeDatabase();
                }
            }
        });
    }
}

function closeDatabase() {
    db.close((err) => {
        if (err) {
            console.error('Ошибка при закрытии базы данных:', err.message);
        } else {
            console.log('Миграция успешно выполнена!');
        }
    });
}
