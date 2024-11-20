import Configs from "../Schemas/Configs.js"
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Определяем __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ConfigsController {
    async create(req, res) {
        try {
            const { title, content, pictures, systemRequirements, assemblyFeatures, description } = req.body
            const configs = await Configs.create({ title, content, pictures, systemRequirements, assemblyFeatures, description })
            return res.status(201).json({ message: 'Assembly created successfully', configs })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const configs = await Configs.find()
            return res.json(configs)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id не указан' })
            }
            const configs = await Configs.findById(id)
            return res.json(configs)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async update(req, res) {
        try {
            const configs = req.body
            if (!configs || !configs.id) {
                return res.status(400).json({ message: 'Configs не указан' })
            }
            const updatedConfigs = await Configs.findByIdAndUpdate(configs.id, configs, { new: true })
            return res.json(updatedConfigs)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params
            const configs = req.body
            if (!id) {
                return res.status(400).json({ message: 'Configs не указан' })
            }
            const updatedConfigs = await Configs.findByIdAndUpdate(id, configs, { new: true })
            return res.json(updatedConfigs)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Id не указан' });
            }
    
            // Найти элемент в базе данных
            const configs = await Configs.findById(id);
            if (!configs) {
                return res.status(404).json({ message: 'Элемент не найден' });
            }
    
            // Удаление связанных фотографий
            if (configs.pictures && configs.pictures.length > 0) {
                for (const picture of configs.pictures) {
                    const filePath = path.join(__dirname, '../../', picture.replace(/^uploads[\/\\]?/, ''));
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Ошибка при удалении файла ${filePath}:`, err);
                        } else {
                            console.log(`Файл удалён: ${filePath}`);
                        }
                    });
                }
            }
    
            // Удалить сам элемент
            await Configs.findByIdAndDelete(id);
    
            return res.json({ message: 'Элемент и связанные файлы успешно удалены', configs });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера', error: e.message });
        }
    }
}

export default new ConfigsController()
