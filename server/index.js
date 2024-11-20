import express from "express";
import mongoose from "mongoose";
import postRouter from "./routers/Post.router.js";
import assembliesRouter from "./routers/assemblies.router.js";
import weaponModelsRouter from './routers/weaponModels.router.js';
import playerModelsRouter from './routers/playerModels.router.js';
import maps from './routers/maps.router.js';
import configs from './routers/configs.router.js';
import graffiti from './routers/graffiti.router.js';
import sounds from './routers/sounds.router.js';
import cors from "cors";
import multer from 'multer';
import path from 'path'
import fs from 'fs'
import jwt from 'jsonwebtoken';
import WeaponModel from './Schemas/WeaponModel.js'; // Добавьте импорт модели
import PlayerModel from './Schemas/PlayerModel.js'; // Добавьте импорт модели
import PostModel from './Schemas/Post.js'; // Добавьте импорт модели
import SoundsModel from './Schemas/Sounds.js'; // Добавьте импорт модели
import MapsModel from './Schemas/Maps.js'; // Добавьте импорт модели
import ConfigsModel from './Schemas/Configs.js'; // Добавьте импорт модели
import AssembliesModel from './Schemas/Assemblies.js'; // Добавьте импорт модели
import GraffitiModel from './Schemas/Graffiti.js'; // Добавьте импорт модели
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Определение __filename и __dirname в модуле ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DB_URL = 'mongodb+srv://csWorldDB:csWorldDB1244@cluster0.cra75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();
app.use(express.json());

app.use(cors({
    origin: ['http://localhost:5173', 'https://csworldfreelance.netlify.app', 'https://cs-world.com.ua']
}));

const SECRET_KEY = 'b0b1d0fefc5a97c6e2b846e7b3fbb4a9f8e3dc9f38a2f9e3f3bb44ff33aa2d12';

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Замените на вашу логику аутентификации
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
});

// Маршрут для проверки токена
app.get('/admin', (req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.sendStatus(403);
            res.json({ message: "Welcome to the admin panel" });
        });
    } else {
        res.sendStatus(401);
    }
});


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/'); // Папка для сохранения файлов
    },
    filename: function (req, file, cb) {
        // Сохраняем файл с его оригинальным именем
        cb(null, file.originalname)
    }
});


// Создание экземпляра multer с указанными настройками
const upload = multer({ storage: storage });

app.post('/api/weapon%20models', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang } = req.body;
    const files = req.files['files'];
    const torrentFiles = req.files['torrentFile'];
    const appFiles = req.files['appFile'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const torrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const appFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const newWeapon = new WeaponModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            assemblyFeatures,
            titleSecondLang,
            descriptionSecondLang,
            tagsSecondLang,
            assemblyFeaturesSecondLang,
            systemRequirementsSecondLang,
            files: [appFilePaths, torrentPaths]
        });

        await newWeapon.save(); // Сохранение в базу данных

        // Логика для сохранения данных в базу или другие действия
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("System Requirements:", systemRequirements);
        console.log("Assembly Features:", assemblyFeatures);
        console.log("Files:", files);
        console.log("appFile:", appFiles);
        console.log("torrentFiles:", torrentFiles);

        res.status(200).send({ message: "Данные успешно получены" });
    } catch (error) {
        console.log(error);  // Логирование ошибок
        res.status(500).send({ message: "Произошла ошибка при сохранении данных" });
    }
});

app.patch('/api/weapon%20models/:id', upload.fields([
    { name: 'files', maxCount: 100 },
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang, picturesToDelete } = req.body;

    const files = req.files ? req.files['files'] : [];
    const newFilePaths = files && files.map(file => `/uploads/${file.filename}`);

    console.log(newFilePaths);
    

    try {
        const existingWeapon = await WeaponModel.findById(id);

        if (!existingWeapon) {
            return res.status(404).send({ message: "Пост не найден" });
        }

        // Обновляем только переданные поля
        if (title) existingWeapon.title = title;
        if (description) existingWeapon.description = description;
        if (tags) existingWeapon.content = tags.split(',');
        if (systemRequirements) existingWeapon.systemRequirements = systemRequirements;
        if (assemblyFeatures) existingWeapon.assemblyFeatures = assemblyFeatures;
        if (titleSecondLang) existingWeapon.titleSecondLang = titleSecondLang;
        if (descriptionSecondLang) existingWeapon.descriptionSecondLang = descriptionSecondLang;
        if (tagsSecondLang) existingWeapon.tagsSecondLang = tagsSecondLang.split(',');
        if (assemblyFeaturesSecondLang) existingWeapon.assemblyFeaturesSecondLang = assemblyFeaturesSecondLang;
        if (systemRequirementsSecondLang) existingWeapon.systemRequirementsSecondLang = systemRequirementsSecondLang;

        // Добавляем новые пути файлов к существующим
        if (newFilePaths) {
            existingWeapon.pictures = [...existingWeapon.pictures, ...newFilePaths];
        }

        // Логируем перед фильтрацией
        console.log("Before delete:", existingWeapon.pictures);

        // Фильтруем картинки, исключая те, которые нужно удалить
        if (picturesToDelete) {
            const parsedPicturesToDelete = Array.isArray(picturesToDelete) || picturesToDelete
                ? picturesToDelete
                : JSON.parse(picturesToDelete); // Убедимся, что это массив

            console.log("Pictures to delete:", parsedPicturesToDelete);

            existingWeapon.pictures = existingWeapon.pictures.filter(
                picture => !parsedPicturesToDelete.includes(picture)
            );

            console.log("After delete:", existingWeapon.pictures);
        }

        // Сохраняем обновленный документ
        await existingWeapon.save();

        res.status(200).send({
            message: "Пост успешно обновлен",
            updatedPost: existingWeapon
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        res.status(500).send({ message: "Произошла ошибка при обновлении данных" });
    }
});



app.post('/api/player%20models', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang } = req.body;
    const files = req.files['files'];
    const torrentFiles = req.files['torrentFile'];
    const appFiles = req.files['appFile'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const torrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const appFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const newPlayer = new PlayerModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            assemblyFeatures,
            titleSecondLang,
            descriptionSecondLang,
            tagsSecondLang,
            assemblyFeaturesSecondLang,
            systemRequirementsSecondLang,
            files: [appFilePaths, torrentPaths]
        });

        await newPlayer.save(); // Сохранение в базу данных

        // Логика для сохранения данных в базу или другие действия
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("System Requirements:", systemRequirements);
        console.log("Assembly Features:", assemblyFeatures);
        console.log("Files:", files);
        console.log("appFile:", appFiles);
        console.log("torrentFiles:", torrentFiles);

        res.status(200).send({ message: "Данные успешно получены" });
    } catch (error) {
        console.log(error);  // Логирование ошибок
        res.status(500).send({ message: "Произошла ошибка при сохранении данных" });
    }
});

app.patch('/api/player%20models/:id', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang, picturesToDelete } = req.body;

    const files = req.files ? req.files['files'] : [];
    const torrentFiles = req.files ? req.files['torrentFile'] : [];
    const appFiles = req.files ? req.files['appFile'] : [];

    const newFilePaths = files && files.map(file => `/uploads/${file.filename}`);
    const newTorrentPaths = torrentFiles && torrentFiles.map(file => `/${file.filename}`);
    const newAppPaths = appFiles && appFiles.map(file => `/${file.filename}`);

    try {
        const existingPlayer = await PlayerModel.findById(id);

        if (!existingPlayer) {
            return res.status(404).send({ message: "Модель игрока не найдена" });
        }

        // Обновляем только переданные поля
        if (title) existingPlayer.title = title;
        if (description) existingPlayer.description = description;
        if (tags) existingPlayer.content = tags.split(',');
        if (systemRequirements) existingPlayer.systemRequirements = systemRequirements;
        if (assemblyFeatures) existingPlayer.assemblyFeatures = assemblyFeatures;
        if (titleSecondLang) existingPlayer.titleSecondLang = titleSecondLang;
        if (descriptionSecondLang) existingPlayer.descriptionSecondLang = descriptionSecondLang;
        if (tagsSecondLang) existingPlayer.tagsSecondLang = tagsSecondLang.split(',');
        if (assemblyFeaturesSecondLang) existingPlayer.assemblyFeaturesSecondLang = assemblyFeaturesSecondLang;
        if (systemRequirementsSecondLang) existingPlayer.systemRequirementsSecondLang = systemRequirementsSecondLang;

        // Добавляем новые файлы к существующим
        if (newFilePaths) {
            existingPlayer.pictures = [...existingPlayer.pictures, ...newFilePaths];
        }
        if (newTorrentPaths) {
            existingPlayer.files = [...existingPlayer.files, ...newTorrentPaths];
        }
        if (newAppPaths) {
            existingPlayer.files = [...existingPlayer.files, ...newAppPaths];
        }

        // Логируем перед фильтрацией
        console.log("Before delete:", existingPlayer.pictures);

        // Фильтруем картинки, исключая те, которые нужно удалить
        if (picturesToDelete) {
            const parsedPicturesToDelete = Array.isArray(picturesToDelete) || picturesToDelete
                ? picturesToDelete
                : JSON.parse(picturesToDelete); // Убедимся, что это массив

            console.log("Pictures to delete:", parsedPicturesToDelete);

            existingPlayer.pictures = existingPlayer.pictures.filter(
                picture => !parsedPicturesToDelete.includes(picture)
            );

            console.log("After delete:", existingPlayer.pictures);
        }

        // Сохраняем обновленный документ
        await existingPlayer.save();

        res.status(200).send({
            message: "Модель игрока успешно обновлена",
            updatedPost: existingPlayer
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        res.status(500).send({ message: "Произошла ошибка при обновлении данных" });
    }
});

app.post('/api/maps', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang } = req.body;
    const files = req.files['files'];
    const torrentFiles = req.files['torrentFile'];
    const appFiles = req.files['appFile'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const torrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const appFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const newMap = new MapsModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            assemblyFeatures,
            titleSecondLang,
            descriptionSecondLang,
            tagsSecondLang,
            assemblyFeaturesSecondLang,
            systemRequirementsSecondLang,
            files: [appFilePaths, torrentPaths]
        });

        await newMap.save(); // Сохранение в базу данных

        // Логика для сохранения данных в базу или другие действия
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("System Requirements:", systemRequirements);
        console.log("Assembly Features:", assemblyFeatures);
        console.log("Files:", files);
        console.log("appFile:", appFiles);
        console.log("torrentFiles:", torrentFiles);

        res.status(200).send({ message: "Данные успешно получены" });
    } catch (error) {
        console.log(error);  // Логирование ошибок
        res.status(500).send({ message: "Произошла ошибка при сохранении данных" });
    }
});

app.patch('/api/maps/:id', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang, picturesToDelete } = req.body;

    const files = req.files ? req.files['files'] : [];
    const torrentFiles = req.files ? req.files['torrentFile'] : [];
    const appFiles = req.files ? req.files['appFile'] : [];

    const newFilePaths = files && files.map(file => `/uploads/${file.filename}`);
    const newTorrentPaths = torrentFiles && torrentFiles.map(file => `/${file.filename}`);
    const newAppPaths = appFiles && appFiles.map(file => `/${file.filename}`);

    try {
        const existingMap = await MapsModel.findById(id);

        if (!existingMap) {
            return res.status(404).send({ message: "Карта не найдена" });
        }

        // Обновляем только переданные поля
        if (title) existingMap.title = title;
        if (description) existingMap.description = description;
        if (tags) existingMap.content = tags.split(',');
        if (systemRequirements) existingMap.systemRequirements = systemRequirements;
        if (assemblyFeatures) existingMap.assemblyFeatures = assemblyFeatures;
        if (titleSecondLang) existingMap.titleSecondLang = titleSecondLang;
        if (descriptionSecondLang) existingMap.descriptionSecondLang = descriptionSecondLang;
        if (tagsSecondLang) existingMap.tagsSecondLang = tagsSecondLang.split(',');
        if (assemblyFeaturesSecondLang) existingMap.assemblyFeaturesSecondLang = assemblyFeaturesSecondLang;
        if (systemRequirementsSecondLang) existingMap.systemRequirementsSecondLang = systemRequirementsSecondLang;

        // Добавляем новые файлы к существующим
        if (newFilePaths) {
            existingMap.pictures = [...existingMap.pictures, ...newFilePaths];
        }
        if (newTorrentPaths) {
            existingMap.files = [...existingMap.files, ...newTorrentPaths];
        }
        if (newAppPaths) {
            existingMap.files = [...existingMap.files, ...newAppPaths];
        }

        // Логируем перед фильтрацией
        console.log("Before delete:", existingMap.pictures);

        // Фильтруем картинки, исключая те, которые нужно удалить
        if (picturesToDelete) {
            const parsedPicturesToDelete = Array.isArray(picturesToDelete) || picturesToDelete
                ? picturesToDelete
                : JSON.parse(picturesToDelete); // Убедимся, что это массив

            console.log("Pictures to delete:", parsedPicturesToDelete);

            existingMap.pictures = existingMap.pictures.filter(
                picture => !parsedPicturesToDelete.includes(picture)
            );

            console.log("After delete:", existingMap.pictures);
        }

        // Сохраняем обновленный документ
        await existingMap.save();

        res.status(200).send({
            message: "Карта успешно обновлена",
            updatedPost: existingMap
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        res.status(500).send({ message: "Произошла ошибка при обновлении данных" });
    }
});


app.post('/api/posts', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, postText, author, titleSecondLang, descriptionSecondLang, tagsSecondLang, authorSecondLang, postTextSecondLang } = req.body;
    const files = req.files['files'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];

    try {
        const newPost = new PostModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            author,
            postText,
            titleSecondLang,
            descriptionSecondLang,
            tagsSecondLang,
            authorSecondLang,
            postTextSecondLang
        });

        await newPost.save(); // Сохранение в базу данных

        // Логика для сохранения данных в базу или другие действия
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("System Requirements:", systemRequirements);
        console.log("Files:", files);

        res.status(200).send({ message: "Данные успешно получены" });
    } catch (error) {
        console.log(error);  // Логирование ошибок
        res.status(500).send({ message: "Произошла ошибка при сохранении данных" });
    }
});

app.patch('/api/posts/:id', upload.fields([
    { name: 'files', maxCount: 100 }
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const { title, description, tags, systemRequirements, postText, author, titleSecondLang, descriptionSecondLang, tagsSecondLang, authorSecondLang, postTextSecondLang, picturesToDelete } = req.body;

    const files = req.files ? req.files['files'] : [];
    const newFilePaths = files && files.map(file => `/uploads/${file.filename}`);

    try {
        const existingPost = await PostModel.findById(id);

        if (!existingPost) {
            return res.status(404).send({ message: "Пост не найден" });
        }

        // Обновляем только переданные поля
        if (title) existingPost.title = title;
        if (description) existingPost.description = description;
        if (tags) existingPost.content = tags.split(',');
        if (systemRequirements) existingPost.systemRequirements = systemRequirements;
        if (postText) existingPost.postText = postText;
        if (author) existingPost.author = author;
        if (titleSecondLang) existingPost.titleSecondLang = titleSecondLang;
        if (descriptionSecondLang) existingPost.descriptionSecondLang = descriptionSecondLang;
        if (tagsSecondLang) existingPost.tagsSecondLang = tagsSecondLang.split(',');
        if (authorSecondLang) existingPost.authorSecondLang = authorSecondLang;
        if (postTextSecondLang) existingPost.postTextSecondLang = postTextSecondLang;

        // Добавляем новые файлы к существующим
        if (newFilePaths) {
            existingPost.pictures = [...existingPost.pictures, ...newFilePaths];
        }

        // Логируем перед фильтрацией
        console.log("Before delete:", existingPost.pictures);

        // Фильтруем картинки, исключая те, которые нужно удалить
        if (picturesToDelete) {
            const parsedPicturesToDelete = Array.isArray(picturesToDelete) || picturesToDelete
                ? picturesToDelete
                : JSON.parse(picturesToDelete); // Убедимся, что это массив

            console.log("Pictures to delete:", parsedPicturesToDelete);

            existingPost.pictures = existingPost.pictures.filter(
                picture => !parsedPicturesToDelete.includes(picture)
            );

            console.log("After delete:", existingPost.pictures);
        }

        // Сохраняем обновленный документ
        await existingPost.save();

        res.status(200).send({
            message: "Пост успешно обновлен",
            updatedPost: existingPost
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        res.status(500).send({ message: "Произошла ошибка при обновлении данных" });
    }
});

app.post('/api/configs', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang } = req.body;
    const files = req.files['files'];
    const torrentFiles = req.files['torrentFile'];
    const appFiles = req.files['appFile'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const torrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const appFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const newConfigs = new ConfigsModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            assemblyFeatures,
            titleSecondLang,
            descriptionSecondLang,
            tagsSecondLang,
            assemblyFeaturesSecondLang,
            systemRequirementsSecondLang,
            files: [appFilePaths, torrentPaths]
        });

        await newConfigs.save(); // Сохранение в базу данных

        // Логика для сохранения данных в базу или другие действия
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("System Requirements:", systemRequirements);
        console.log("Assembly Features:", assemblyFeatures);
        console.log("Files:", files);
        console.log("appFile:", appFiles);
        console.log("torrentFiles:", torrentFiles);

        res.status(200).send({ message: "Данные успешно получены" });
    } catch (error) {
        console.log(error);  // Логирование ошибок
        res.status(500).send({ message: "Произошла ошибка при сохранении данных" });
    }
});

app.patch('/api/configs/:id', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang, picturesToDelete } = req.body;

    const files = req.files['files'] || [];
    const torrentFiles = req.files['torrentFile'] || [];
    const appFiles = req.files['appFile'] || [];

    const newFilePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const newTorrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const newAppFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const existingConfig = await ConfigsModel.findById(id);

        if (!existingConfig) {
            return res.status(404).send({ message: "Конфигурация не найдена" });
        }

        // Обновляем только переданные поля
        if (title) existingConfig.title = title;
        if (description) existingConfig.description = description;
        if (tags) existingConfig.content = tags.split(',');
        if (systemRequirements) existingConfig.systemRequirements = systemRequirements;
        if (assemblyFeatures) existingConfig.assemblyFeatures = assemblyFeatures;
        if (titleSecondLang) existingConfig.titleSecondLang = titleSecondLang;
        if (descriptionSecondLang) existingConfig.descriptionSecondLang = descriptionSecondLang;
        if (tagsSecondLang) existingConfig.tagsSecondLang = tagsSecondLang.split(',');
        if (assemblyFeaturesSecondLang) existingConfig.assemblyFeaturesSecondLang = assemblyFeaturesSecondLang;
        if (systemRequirementsSecondLang) existingConfig.systemRequirementsSecondLang = systemRequirementsSecondLang;

        // Добавляем новые файлы к существующим
        if (newFilePaths.length > 0) {
            existingConfig.pictures = [...existingConfig.pictures, ...newFilePaths];
        }

        if (newTorrentPaths.length > 0 || newAppFilePaths.length > 0) {
            existingConfig.files = [newAppFilePaths, newTorrentPaths];
        }

        // Логируем перед фильтрацией
        console.log("Before delete:", existingConfig.pictures);

        // Фильтруем картинки, исключая те, которые нужно удалить
        if (picturesToDelete) {
            const parsedPicturesToDelete = Array.isArray(picturesToDelete) || picturesToDelete
                ? picturesToDelete
                : JSON.parse(picturesToDelete); // Убедимся, что это массив

            console.log("Pictures to delete:", parsedPicturesToDelete);

            existingConfig.pictures = existingConfig.pictures.filter(
                picture => !parsedPicturesToDelete.includes(picture)
            );

            console.log("After delete:", existingConfig.pictures);
        }

        // Сохраняем обновленный документ
        await existingConfig.save();

        res.status(200).send({
            message: "Конфигурация успешно обновлена",
            updatedConfig: existingConfig
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        res.status(500).send({ message: "Произошла ошибка при обновлении данных" });
    }
});

app.post('/api/graffiti', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang } = req.body;
    const files = req.files['files'];
    const torrentFiles = req.files['torrentFile'];
    const appFiles = req.files['appFile'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const torrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const appFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const newGraffiti = new GraffitiModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            assemblyFeatures,
            titleSecondLang,
            descriptionSecondLang,
            tagsSecondLang,
            assemblyFeaturesSecondLang,
            systemRequirementsSecondLang,
            files: [appFilePaths, torrentPaths]
        });

        await newGraffiti.save(); // Сохранение в базу данных

        // Логика для сохранения данных в базу или другие действия
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("System Requirements:", systemRequirements);
        console.log("Assembly Features:", assemblyFeatures);
        console.log("Files:", files);
        console.log("appFile:", appFiles);
        console.log("torrentFiles:", torrentFiles);

        res.status(200).send({ message: "Данные успешно получены" });
    } catch (error) {
        console.log(error);  // Логирование ошибок
        res.status(500).send({ message: "Произошла ошибка при сохранении данных" });
    }
});

app.patch('/api/graffiti/:id', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang, picturesToDelete } = req.body;

    const files = req.files['files'] || [];
    const torrentFiles = req.files['torrentFile'] || [];
    const appFiles = req.files['appFile'] || [];

    const newFilePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const newTorrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const newAppFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const existingGraffiti = await GraffitiModel.findById(id);

        if (!existingGraffiti) {
            return res.status(404).send({ message: "Граффити не найдено" });
        }

        // Обновляем только переданные поля
        if (title) existingGraffiti.title = title;
        if (description) existingGraffiti.description = description;
        if (tags) existingGraffiti.content = tags.split(',');
        if (systemRequirements) existingGraffiti.systemRequirements = systemRequirements;
        if (assemblyFeatures) existingGraffiti.assemblyFeatures = assemblyFeatures;
        if (titleSecondLang) existingGraffiti.titleSecondLang = titleSecondLang;
        if (descriptionSecondLang) existingGraffiti.descriptionSecondLang = descriptionSecondLang;
        if (tagsSecondLang) existingGraffiti.tagsSecondLang = tagsSecondLang.split(',');
        if (assemblyFeaturesSecondLang) existingGraffiti.assemblyFeaturesSecondLang = assemblyFeaturesSecondLang;
        if (systemRequirementsSecondLang) existingGraffiti.systemRequirementsSecondLang = systemRequirementsSecondLang;

        // Добавляем новые файлы к существующим
        if (newFilePaths.length > 0) {
            existingGraffiti.pictures = [...existingGraffiti.pictures, ...newFilePaths];
        }

        if (newTorrentPaths.length > 0 || newAppFilePaths.length > 0) {
            existingGraffiti.files = [newAppFilePaths, newTorrentPaths];
        }

        // Логируем перед фильтрацией
        console.log("Before delete:", existingGraffiti.pictures);

        // Фильтруем картинки, исключая те, которые нужно удалить
        if (picturesToDelete) {
            const parsedPicturesToDelete = Array.isArray(picturesToDelete) || picturesToDelete
                ? picturesToDelete
                : JSON.parse(picturesToDelete); // Убедимся, что это массив

            console.log("Pictures to delete:", parsedPicturesToDelete);

            existingGraffiti.pictures = existingGraffiti.pictures.filter(
                picture => !parsedPicturesToDelete.includes(picture)
            );

            console.log("After delete:", existingGraffiti.pictures);
        }

        // Сохраняем обновленный документ
        await existingGraffiti.save();

        res.status(200).send({
            message: "Граффити успешно обновлено",
            updatedGraffiti: existingGraffiti
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        res.status(500).send({ message: "Произошла ошибка при обновлении данных" });
    }
});

app.post('/api/assemblies', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang } = req.body;
    const files = req.files['files'];
    const torrentFiles = req.files['torrentFile'];
    const appFiles = req.files['appFile'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const torrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const appFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const newAssemblies = new AssembliesModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            assemblyFeatures,
            titleSecondLang,
            descriptionSecondLang,
            tagsSecondLang,
            assemblyFeaturesSecondLang,
            systemRequirementsSecondLang,
            files: [appFilePaths, torrentPaths]
        });

        await newAssemblies.save(); // Сохранение в базу данных

        // Логика для сохранения данных в базу или другие действия
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("System Requirements:", systemRequirements);
        console.log("Assembly Features:", assemblyFeatures);
        console.log("Files:", files);
        console.log("appFile:", appFiles);
        console.log("torrentFiles:", torrentFiles);

        res.status(200).send({ message: "Данные успешно получены" });
    } catch (error) {
        console.log(error);  // Логирование ошибок
        res.status(500).send({ message: "Произошла ошибка при сохранении данных" });
    }
});

app.patch('/api/assemblies/:id', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang, picturesToDelete } = req.body;

    const files = req.files['files'] || [];
    const torrentFiles = req.files['torrentFile'] || [];
    const appFiles = req.files['appFile'] || [];

    const newFilePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const newTorrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const newAppFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const existingAssembly = await AssembliesModel.findById(id);

        if (!existingAssembly) {
            return res.status(404).send({ message: "Сборка не найдена" });
        }

        // Обновляем только переданные поля
        if (title) existingAssembly.title = title;
        if (description) existingAssembly.description = description;
        if (tags) existingAssembly.content = tags.split(',');
        if (systemRequirements) existingAssembly.systemRequirements = systemRequirements;
        if (assemblyFeatures) existingAssembly.assemblyFeatures = assemblyFeatures;
        if (titleSecondLang) existingAssembly.titleSecondLang = titleSecondLang;
        if (descriptionSecondLang) existingAssembly.descriptionSecondLang = descriptionSecondLang;
        if (tagsSecondLang) existingAssembly.tagsSecondLang = tagsSecondLang.split(',');
        if (assemblyFeaturesSecondLang) existingAssembly.assemblyFeaturesSecondLang = assemblyFeaturesSecondLang;
        if (systemRequirementsSecondLang) existingAssembly.systemRequirementsSecondLang = systemRequirementsSecondLang;

        // Добавляем новые файлы к существующим
        if (newFilePaths.length > 0) {
            existingAssembly.pictures = [...existingAssembly.pictures, ...newFilePaths];
        }

        if (newTorrentPaths.length > 0 || newAppFilePaths.length > 0) {
            existingAssembly.files = [newAppFilePaths, newTorrentPaths];
        }

        // Логируем перед фильтрацией
        console.log("Before delete:", existingAssembly.pictures);

        // Фильтруем картинки, исключая те, которые нужно удалить
        if (picturesToDelete) {
            const parsedPicturesToDelete = Array.isArray(picturesToDelete) || picturesToDelete
                ? picturesToDelete
                : JSON.parse(picturesToDelete); // Убедимся, что это массив

            console.log("Pictures to delete:", parsedPicturesToDelete);

            existingAssembly.pictures = existingAssembly.pictures.filter(
                picture => !parsedPicturesToDelete.includes(picture)
            );

            console.log("After delete:", existingAssembly.pictures);
        }

        // Сохраняем обновленный документ
        await existingAssembly.save();

        res.status(200).send({
            message: "Сборка успешно обновлена",
            updatedAssembly: existingAssembly
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        res.status(500).send({ message: "Произошла ошибка при обновлении данных" });
    }
});

app.post('/api/sounds', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang } = req.body;
    const files = req.files['files'];
    const torrentFiles = req.files['torrentFile'];
    const appFiles = req.files['appFile'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const torrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const appFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const newSound = new SoundsModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            assemblyFeatures,
            titleSecondLang,
            descriptionSecondLang,
            tagsSecondLang,
            assemblyFeaturesSecondLang,
            systemRequirementsSecondLang,
            files: [appFilePaths, torrentPaths]
        });

        await newSound.save(); // Сохранение в базу данных

        // Логика для сохранения данных в базу или другие действия
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("Tags:", tags);
        console.log("System Requirements:", systemRequirements);
        console.log("Assembly Features:", assemblyFeatures);
        console.log("Files:", files);
        console.log("appFile:", appFiles);
        console.log("torrentFiles:", torrentFiles);

        res.status(200).send({ message: "Данные успешно получены" });
    } catch (error) {
        console.log(error);  // Логирование ошибок
        res.status(500).send({ message: "Произошла ошибка при сохранении данных" });
    }
});

app.get('/api/download/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(__dirname, '../uploads', fileName); // Путь к файлу в папке 'uploads'

    // Проверка существования файла перед отправкой
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error('Файл не найден:', filePath);
            return res.status(404).send({ message: 'Файл не найден' });
        }

        // Отправка файла клиенту
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Ошибка при скачивании файла:', err);
                res.status(500).send({ message: 'Ошибка при скачивании файла' });
            }
        });
    });
});

app.patch('/api/sounds/:id', upload.fields([
    { name: 'files', maxCount: 100 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const { id } = req.params;
    const { title, description, tags, systemRequirements, assemblyFeatures, titleSecondLang, descriptionSecondLang, tagsSecondLang, assemblyFeaturesSecondLang, systemRequirementsSecondLang, picturesToDelete } = req.body;

    const files = req.files['files'] || [];
    const torrentFiles = req.files['torrentFile'] || [];
    const appFiles = req.files['appFile'] || [];

    const newFilePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const newTorrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const newAppFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const existingSound = await SoundsModel.findById(id);

        if (!existingSound) {
            return res.status(404).send({ message: "Звук не найден" });
        }

        // Обновляем только переданные поля
        if (title) existingSound.title = title;
        if (description) existingSound.description = description;
        if (tags) existingSound.content = tags.split(',');
        if (systemRequirements) existingSound.systemRequirements = systemRequirements;
        if (assemblyFeatures) existingSound.assemblyFeatures = assemblyFeatures;
        if (titleSecondLang) existingSound.titleSecondLang = titleSecondLang;
        if (descriptionSecondLang) existingSound.descriptionSecondLang = descriptionSecondLang;
        if (tagsSecondLang) existingSound.tagsSecondLang = tagsSecondLang.split(',');
        if (assemblyFeaturesSecondLang) existingSound.assemblyFeaturesSecondLang = assemblyFeaturesSecondLang;
        if (systemRequirementsSecondLang) existingSound.systemRequirementsSecondLang = systemRequirementsSecondLang;

        // Добавляем новые файлы к существующим
        if (newFilePaths.length > 0) {
            existingSound.pictures = [...existingSound.pictures, ...newFilePaths];
        }

        if (newTorrentPaths.length > 0 || newAppFilePaths.length > 0) {
            existingSound.files = [newAppFilePaths, newTorrentPaths];
        }

        // Логируем перед фильтрацией
        console.log("Before delete:", existingSound.pictures);

        // Фильтруем картинки, исключая те, которые нужно удалить
        if (picturesToDelete) {
            const parsedPicturesToDelete = Array.isArray(picturesToDelete) || picturesToDelete
                ? picturesToDelete
                : JSON.parse(picturesToDelete); // Убедимся, что это массив

            console.log("Pictures to delete:", parsedPicturesToDelete);

            existingSound.pictures = existingSound.pictures.filter(
                picture => !parsedPicturesToDelete.includes(picture)
            );

            console.log("After delete:", existingSound.pictures);
        }

        // Сохраняем обновленный документ
        await existingSound.save();

        res.status(200).send({
            message: "Звук успешно обновлен",
            updatedSound: existingSound
        });
    } catch (error) {
        console.error("Ошибка при обновлении данных:", error);
        res.status(500).send({ message: "Произошла ошибка при обновлении данных" });
    }
});

app.patch('/api/:name/:id/deleteImage', (req, res) => {
    const { imageUrl } = req.body; // Извлекаем imageUrl из тела запроса

    if (!imageUrl) {
        return res.status(400).send({ message: 'Не указан URL изображения' });
    }

    // Извлекаем имя файла из URL
    const fileName = path.basename(imageUrl); 
    const filePath = path.join(__dirname, '../uploads', fileName);

    // Удаляем файл с диска
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Ошибка при удалении файла:', err);
            return res.status(500).send({ message: 'Ошибка при удалении изображения' });
        }
        res.status(200).send({ message: 'Изображение удалено' });
    });
});

app.use('/api', postRouter);
app.use('/api', assembliesRouter);
app.use('/api', weaponModelsRouter);
app.use('/api', playerModelsRouter);
app.use('/api', maps);
app.use('/api', configs);
app.use('/api', sounds);
app.use('/api', graffiti);


async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, () => console.log(`Server started: localhost:${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

startApp();
