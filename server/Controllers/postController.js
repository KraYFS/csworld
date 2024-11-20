import Post from "../Schemas/Post.js"
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Определяем __dirname для ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class postController {
    async create(req, res) {
        try {
            const { author, title, content, picture, postText } = req.body
            const post = await Post.create({ author, title, content, picture, postText })
            res.json(post)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async getAll(req, res) {
        try {
            const posts = await Post.find()
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ message: 'Id не указан' })
            }
            const posts = await Post.findById(id)
            return res.json(posts)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const post = req.body
            if (!post._id) {
                res.status(400).json({ message: 'Post не указан' })
            }
            const updatedPost = await Post.findByIdAndUpdate(post._id, post, { new: true })
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params
            const post = req.body
            if (!id) {
                res.status(400).json({ message: 'Post не указан' })
            }
            const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })
            return res.json(updatedPost)
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Id не указан' });
            }
    
            // Найти элемент в базе данных
            const post = await Post.findById(id);
            if (!post) {
                return res.status(404).json({ message: 'Элемент не найден' });
            }
    
            // Удаление связанных фотографий
            if (post.pictures && post.pictures.length > 0) {
                for (const picture of post.pictures) {
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
            await Post.findByIdAndDelete(id);
    
            return res.json({ message: 'Элемент и связанные файлы успешно удалены', post });
        } catch (e) {
            console.error(e);
            return res.status(500).json({ message: 'Внутренняя ошибка сервера', error: e.message });
        }
    }
}

export default new postController()