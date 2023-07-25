import {handleRequest} from "./handleRequest.mjs";

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
        const newData = req.body; // Предполагаем, что данные отправлены в теле запроса (например, в формате JSON)
        try {
            await updateProfileData(dbPath, newData);
            res.json({ message: 'Данные профиля успешно обновлены' });
        } catch (error) {
            console.error('Ошибка при обновлении данных профиля:', error.message);
            res.status(500).json({ error: 'Ошибка при обновлении данных профиля' });
        }
    });
}