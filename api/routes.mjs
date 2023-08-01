import {getters} from "./getters.mjs";
import {catchError} from "../helpers/helpers.mjs";
import {updateProfileData, updateUserMessages, updateUserNews} from './setters.js';
import {
    GET_PROFILE_DATA,
    GET_USER_MESSAGES,
    GET_USER_NEWS,
    SET_PROFILE_DATA,
    SET_USER_MESSAGES,
    SET_USER_NEWS
} from "./constants.mjs";

export const routes = (app, dbPath) => {

    // GET

    app.get(GET_PROFILE_DATA, async (req, res) => {
        const url = req.url;
        const data = await getters(url, dbPath);
        res.json(data);
    });

    app.get(GET_USER_NEWS, async (req, res) => {
        const url = req.url;
        const data = await getters(url, dbPath);
        res.json(data);
    });

    app.get(GET_USER_MESSAGES, async (req, res) => {
        const url = req.url;
        const data = await getters(url, dbPath);
        res.json(data);
    });


    // POST

    app.post(SET_PROFILE_DATA, async (req, res) => {
        try {
            await updateProfileData(dbPath, req.body);
            const updatedData = await getters(GET_PROFILE_DATA, dbPath);
            res.json(updatedData);
        } catch (error) {
            catchError(error, res);
        }
    });

    app.post(SET_USER_NEWS, async (req, res) => {
        try {
            await updateUserNews(dbPath, req.body);
            const updatedData = await getters(GET_USER_NEWS, dbPath);
            res.json(updatedData);
        } catch (error) { catchError(error, res) }
    });

    app.post(SET_USER_MESSAGES, async (req, res) => {
        try {
            await updateUserMessages(dbPath, req.body);
            const updatedData = await getters(GET_USER_MESSAGES, dbPath);
            res.json(updatedData);
        } catch (error) { catchError(error, res) }
    });
}