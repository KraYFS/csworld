import Maps from "../Schemas/Maps.js"
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Определяем __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MapsController {
    async create(req, res) {
        try {
            const { title, content, pictures, systemRequirements, assemblyFeatures, description } = req.body
            const maps = await Maps.create({ title, content, pictures, systemRequirements, assemblyFeatures, description })
            return res.status(201).json({ message: 'Assembly created successfully', maps })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const maps = await Maps.find()
            return res.json(maps)
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
            const maps = await Maps.findById(id)
            return res.json(maps)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async update(req, res) {
        try {
            const maps = req.body
            if (!maps || !maps.id) {
                return res.status(400).json({ message: 'Maps не указан' })
            }
            const updatedMaps = await Maps.findByIdAndUpdate(maps.id, maps, { new: true })
            return res.json(updatedMaps)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params
            const maps = req.body
            if (!id) {
                return res.status(400).json({ message: 'Maps не указан' })
            }
            const updatedMaps = await Maps.findByIdAndUpdate(id, maps, { new: true })
            return res.json(updatedMaps)
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
            const maps = await Maps.findById(id);
            if (!maps) {
                return res.status(404).json({ message: 'Элемент не найден' });
            }
    
            // Удаление связанных фотографий
            if (maps.pictures && maps.pictures.length > 0) {
                for (const picture of maps.pictures) {
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
            await Maps.findByIdAndDelete(id);
    
            return res.json({ message: 'Элемент и связанные файлы успешно удалены', maps });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера', error: e.message });
        }
    }
}

export default new MapsController()
