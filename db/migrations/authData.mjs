import sqlite3 from 'sqlite3';

const dbPath = '../mydatabase.db';
const dbConnect = (dbPath) => {
    const db = new sqlite3.Database(dbPath);

    db.run(`
        CREATE TABLE IF NOT EXISTS authData (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            login TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `);

    return db;
};

const db = dbConnect(dbPath);

db.close();
