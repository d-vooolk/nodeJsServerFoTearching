import {getters} from "./getters.mjs";
import {catchError} from "../helpers/helpers.mjs";
import {updateProfileData, updateUserMessages, updateUserNews} from './setters.js';

export const routes = (app, dbPath) => {

    // GET

    app.get('/profile', async (req, res) => {
        const url = req.url;
        const data = await getters(url, dbPath);
        res.json(data);
    });

    app.get('/user-news', async (req, res) => {
        const url = req.url;
        const data = await getters(url, dbPath);
        res.json(data);
    });

    app.get('/user-messages', async (req, res) => {
        const url = req.url;
        const data = await getters(url, dbPath);
        res.json(data);
    });


    // POST

    app.post('/setProfileData', async (req, res) => {
        try {
            await updateProfileData(dbPath, req.body);
            res.json({ message: 'Данные профиля успешно обновлены' });
        } catch (error) { catchError(error, res) }
    });

    app.post('/setUserNewsData', async (req, res) => {
        try {
            await updateUserNews(dbPath, req.body);
            res.json({ message: 'Данные новостей успешно обновлены' });
        } catch (error) { catchError(error, res) }
    });

    app.post('/setUserMessagesData', async (req, res) => {
        try {
            await updateUserMessages(dbPath, req.body);
            res.json({ message: 'Данные сообщений успешно обновлены' });
        } catch (error) { catchError(error, res) }
    });
}