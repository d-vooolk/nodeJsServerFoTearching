import {handleRequest, updateProfileData} from "./handleRequest.mjs";

export const getRoutes = (app, dbPath) => {
    app.get('/profile', async (req, res) => {
        const url = req.url;
        const data = await handleRequest(url, dbPath);
        res.json(data);
    });

    app.get('/user-news', async (req, res) => {
        const url = req.url;
        const data = await handleRequest(url, dbPath);
        res.json(data);
    });

    app.get('/user-messages', async (req, res) => {
        const url = req.url;
        const data = await handleRequest(url, dbPath);
        res.json(data);
    });

    app.post('/setProfileData', async (req, res) => {
        try {
            await updateProfileData(dbPath, req.body);
            res.json({ message: 'Данные профиля успешно обновлены' });
        } catch (error) {
            console.error('Ошибка при обновлении данных профиля:', error.message);
            res.status(500).json({ error: 'Ошибка при обновлении данных профиля' });
        }
    });
}