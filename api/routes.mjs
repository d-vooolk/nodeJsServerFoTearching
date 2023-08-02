import {getters} from "./getters.mjs";
import {catchError} from "../helpers/helpers.mjs";
import {registerUser, updateProfileData, updateUserMessages, updateUserNews} from './setters.js';
import {
    GET_PROFILE_DATA,
    GET_USER_MESSAGES,
    GET_USER_NEWS,
    REGISTRATION_NEW_USER,
    SET_PROFILE_DATA,
    SET_USER_MESSAGES,
    SET_USER_NEWS
} from "./constants.mjs";
import {getUserByLogin} from "./getters/getUserByLogin.mjs";
import {AUTH} from "./constants.mjs";

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
        } catch (error) {
            catchError(error, res)
        }
    });

    app.post(SET_USER_MESSAGES, async (req, res) => {
        try {
            await updateUserMessages(dbPath, req.body);
            const updatedData = await getters(GET_USER_MESSAGES, dbPath);
            res.json(updatedData);
        } catch (error) {
            catchError(error, res)
        }
    });


    app.post(REGISTRATION_NEW_USER, async (req, res) => {
        try {
            const registrationData = req.body;

            setTimeout(async () => {
                const existingUser = await getUserByLogin(dbPath, registrationData);

                if (existingUser) {
                    return res.status(400).json({error: 'Пользователь с таким логином уже существует'});
                }

                await registerUser(dbPath, registrationData);
                res.status(200).json({success: 'Пользователь успешно добавлен'});
            }, 1000);
        } catch (error) {
            catchError(error, res);
        }
    });

    app.post(AUTH, async (req, res) => {
        try {
            const authData = req.body;

            const existingUser = await getUserByLogin(dbPath, authData);

            if (!existingUser) {
                return res.status(400).json({error: 'Пользователя с такими данными не существует'});
            }

            if (authData.login === existingUser.login && authData.password === existingUser.password) {
                return res.status(200).json({success: 'Вход успешно выполнен'});
            }

            return res.status(400).json({error: 'Данные не верны'});
        } catch (error) {
            catchError(error, res);
        }
    });


}