import PlayerModel from "../Schemas/PlayerModel.js"

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
            const { id } = req.params
            if (!id) {
                return res.status(400).json({ message: 'Id не указан' })
            }
            const playerModel = await PlayerModel.findByIdAndDelete(id)
            return res.json({ message: 'Assembly deleted successfully', playerModel })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }
}

export default new playerModelController()
