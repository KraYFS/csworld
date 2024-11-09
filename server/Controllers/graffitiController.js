import Graffiti from "../Schemas/Graffiti.js"

class GraffitiController {
    async create(req, res) {
        try {
            const { title, content, pictures, systemRequirements, assemblyFeatures, description } = req.body
            const graffiti = await Graffiti.create({ title, content, pictures, systemRequirements, assemblyFeatures, description })
            return res.status(201).json({ message: 'Assembly created successfully', graffiti })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const graffiti = await Graffiti.find()
            return res.json(graffiti)
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
            const graffiti = await Graffiti.findById(id)
            return res.json(graffiti)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async update(req, res) {
        try {
            const graffiti = req.body
            if (!graffiti || !graffiti.id) {
                return res.status(400).json({ message: 'Graffiti не указан' })
            }
            const updatedGraffiti = await Graffiti.findByIdAndUpdate(graffiti.id, graffiti, { new: true })
            return res.json(updatedGraffiti)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params
            const graffiti = req.body
            if (!id) {
                return res.status(400).json({ message: 'Graffiti не указан' })
            }
            const updatedGraffiti = await Graffiti.findByIdAndUpdate(id, graffiti, { new: true })
            return res.json(updatedGraffiti)
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
            const graffiti = await Graffiti.findByIdAndDelete(id)
            return res.json({ message: 'Assembly deleted successfully', graffiti })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }
}

export default new GraffitiController()
