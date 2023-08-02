import sqlite3 from "sqlite3";
import {faker} from "@faker-js/faker";

export const dbConnect = (path) => new sqlite3.Database(path, (err) => {
    if (err) {
        console.error('Ошибка при подключении к базе данных:', err.message);
    } else {
        console.log('Успешное подключение к базе данных');
    }
});

export const generateRandomUser = () => {
    const personSex = faker.person.sex();
    return {
        avatar: faker.image.avatar(),
        gender: personSex,
        age: faker.number.int({ min: 18, max: 65 }),
        name: faker.person.firstName(personSex),
        secondName: faker.person.lastName(personSex),
        aboutMe: faker.lorem.sentence(),
        status: faker.helpers.arrayElement(['single', 'married', 'divorced']),
        city: faker.location.city(),
        phoneNumber: faker.phone.number('+375 29 ### ## ##'),
        telegram: '@' + faker.internet.userName(),
        instagram: faker.internet.userName(),
        twitter: faker.internet.userName(),
        friends: [],
        subscribers: [],
    };
}

export function parseJSONFields(data) {
    for (const key in data) {
        if (typeof data[key] === 'string') {
            if (data[key].startsWith('{') || data[key].startsWith('[')) {
                try {
                    data[key] = JSON.parse(data[key]);
                } catch (error) {
                    console.error('Ошибка при парсинге JSON:', error);
                }
            }
        } else if (typeof data[key] === 'object') {
            data[key] = parseJSONFields(data[key]);
        }
    }
    return data;
}


export const convertPropertiesToJson = (obj) => {
    for (const prop in obj) {
        if (Array.isArray(obj[prop]) || typeof obj[prop] === 'object') {
            obj[prop] = JSON.stringify(obj[prop]);
        }
    }
    return obj;
}

export const catchError = (error, res) => {
    console.error('Ошибка при обновлении данных:', error.message);
    res.status(500).json({ error: 'Ошибка при обновлении данных' });
}


