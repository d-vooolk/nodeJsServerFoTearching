import sqlite3 from "sqlite3";

export const dbConnect = (path) => new sqlite3.Database(path, (err) => {
    if (err) {
        console.error('Ошибка при подключении к базе данных:', err.message);
    } else {
        console.log('Успешное подключение к базе данных');
    }
});


export const parseJSONFields = (data) => {
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