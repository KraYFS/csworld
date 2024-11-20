import PlayerModel from "../Schemas/PlayerModel.js"
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Определяем __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class playerModelController {
    async create(req, res) {
        try {
            const { title, content, pictures, systemRequirements, assemblyFeatures, description } = req.body
            const playerModel = await PlayerModel.create({ title, content, pictures, systemRequirements, assemblyFeatures, description })
            return res.status(201).json({ message: 'Assembly created successfully', playerModel })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const playerModel = await PlayerModel.find()
            return res.json(playerModel)
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
            const playerModel = await PlayerModel.findById(id)
            return res.json(playerModel)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async update(req, res) {
        try {
            const playerModel = req.body
            if (!playerModel || !playerModel.id) {
                return res.status(400).json({ message: 'PlayerModel не указан' })
            }
            const updatedPlayerModel = await PlayerModel.findByIdAndUpdate(playerModel.id, playerModel, { new: true })
            return res.json(updatedPlayerModel)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params
            const playerModel = req.body
            if (!id) {
                return res.status(400).json({ message: 'PlayerModel не указан' })
            }
            const updatedPlayerModel = await PlayerModel.findByIdAndUpdate(id, playerModel, { new: true })
            return res.json(updatedPlayerModel)
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
            const playerModel = await PlayerModel.findById(id);
            if (!playerModel) {
                return res.status(404).json({ message: 'Элемент не найден' });
            }
    
            // Удаление связанных фотографий
            if (playerModel.pictures && playerModel.pictures.length > 0) {
                for (const picture of playerModel.pictures) {
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
            await PlayerModel.findByIdAndDelete(id);
    
            return res.json({ message: 'Элемент и связанные файлы успешно удалены', playerModel });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера', error: e.message });
        }
    }
}

export default new playerModelController()
