import Maps from "../Schemas/Maps.js"

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
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id не указан' })
            }
            const maps = await Maps.findByIdAndDelete(id)
            return res.json({ message: 'Assembly deleted successfully', maps })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }
}

export default new MapsController()
