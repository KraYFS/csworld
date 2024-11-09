import Configs from "../Schemas/Configs.js"

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
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id не указан' })
            }
            const configs = await Configs.findByIdAndDelete(id)
            return res.json({ message: 'Assembly deleted successfully', configs })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }
}

export default new ConfigsController()
