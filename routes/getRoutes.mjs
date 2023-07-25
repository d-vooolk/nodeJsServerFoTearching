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
}