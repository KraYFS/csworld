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
import WeaponModel from './Schemas/WeaponModel.js'; // Добавьте импорт модели
import PlayerModel from './Schemas/PlayerModel.js'; // Добавьте импорт модели
import PostModel from './Schemas/Post.js'; // Добавьте импорт модели
import SoundsModel from './Schemas/Sounds.js'; // Добавьте импорт модели
import MapsModel from './Schemas/Maps.js'; // Добавьте импорт модели
import ConfigsModel from './Schemas/Configs.js'; // Добавьте импорт модели
import AssembliesModel from './Schemas/Assemblies.js'; // Добавьте импорт модели
import GraffitiModel from './Schemas/Graffiti.js'; // Добавьте импорт модели
import { fileURLToPath } from 'url';

// Определение __filename и __dirname в модуле ES6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const DB_URL = 'mongodb+srv://csWorldDB:csWorldDB1244@cluster0.cra75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://csworldfreelance.netlify.app']
}));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/'); // Папка для сохранения файлов
    },
    filename: function (req, file, cb) {
        // Сохраняем файл с его оригинальным именем
        cb(null, Date.now() + path.extname(file.originalname)); // Оригинальное имя файла с расширением
    }
});

// Создание экземпляра multer с указанными настройками
const upload = multer({ storage: storage });

app.post('/api/weapon%20models', upload.fields([
    { name: 'files', maxCount: 10 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures } = req.body;
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

app.post('/api/player%20models', upload.fields([
    { name: 'files', maxCount: 10 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures } = req.body;
    const files = req.files['files'];
    const torrentFiles = req.files['torrentFile'];
    const appFiles = req.files['appFile'];

    const filePaths = files ? files.map(file => `/uploads/${file.filename}`) : [];
    const torrentPaths = torrentFiles ? torrentFiles.map(file => `/${file.filename}`) : [];
    const appFilePaths = appFiles ? appFiles.map(file => `/${file.filename}`) : [];

    try {
        const newWeapon = new PlayerModel({
            title,
            content: tags.split(','),
            pictures: filePaths,
            description,
            systemRequirements,
            assemblyFeatures,
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

app.post('/api/maps', upload.fields([
    { name: 'files', maxCount: 10 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures } = req.body;
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

app.post('/api/posts', upload.fields([
    { name: 'files', maxCount: 10 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, postText, author } = req.body;
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
            postText
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

app.post('/api/configs', upload.fields([
    { name: 'files', maxCount: 10 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures } = req.body;
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

app.post('/api/graffiti', upload.fields([
    { name: 'files', maxCount: 10 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures } = req.body;
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

app.post('/api/assemblies', upload.fields([
    { name: 'files', maxCount: 10 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures } = req.body;
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

app.post('/api/sounds', upload.fields([
    { name: 'files', maxCount: 10 },
    { name: 'torrentFile', maxCount: 1 },
    { name: 'appFile', maxCount: 1 }
]), async (req, res) => {
    const { title, description, tags, systemRequirements, assemblyFeatures } = req.body;
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

app.use(express.json());
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
