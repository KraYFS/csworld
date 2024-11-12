import Sounds from "../Schemas/Sounds.js"

class SoundsController {
    async create(req, res) {
        try {
            const { title, content, pictures, systemRequirements, assemblyFeatures, description } = req.body
            const sounds = await Sounds.create({ title, content, pictures, systemRequirements, assemblyFeatures, description })
            return res.status(201).json({ message: 'Assembly created successfully', sounds })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const sounds = await Sounds.find()
            return res.json(sounds)
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
            const sounds = await Sounds.findById(id)
            return res.json(sounds)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async update(req, res) {
        try {
            const sounds = req.body
            if (!sounds || !sounds.id) {
                return res.status(400).json({ message: 'Sounds не указан' })
            }
            const updatedSounds = await Sounds.findByIdAndUpdate(sounds.id, sounds, { new: true })
            return res.json(updatedSounds)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params
            const sounds = req.body
            if (!id) {
                return res.status(400).json({ message: 'Sounds не указан' })
            }
            const updatedSounds = await Sounds.findByIdAndUpdate(id, sounds, { new: true })
            return res.json(updatedSounds)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id не указан' })
            }
            const sounds = await Sounds.findByIdAndDelete(id)
            return res.json({ message: 'Assembly deleted successfully', sounds })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }
}

export default new SoundsController()
