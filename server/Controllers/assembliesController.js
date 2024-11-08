import Assemblies from "../Schemas/Assemblies.js"

class assembliesController {
    async create(req, res) {
        try {
            const { title, content, pictures, systemRequirements, assemblyFeatures, description } = req.body
            const assemblies = await Assemblies.create({ title, content, pictures, systemRequirements, assemblyFeatures, description })
            return res.status(201).json({ message: 'Assembly created successfully', assemblies })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const assemblies = await Assemblies.find()
            return res.json(assemblies)
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
            const assemblies = await Assemblies.findById(id)
            return res.json(assemblies)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async update(req, res) {
        try {
            const assemblies = req.body
            if (!assemblies || !assemblies.id) {
                return res.status(400).json({ message: 'Assemblies не указан' })
            }
            const updatedAssemblies = await Assemblies.findByIdAndUpdate(assemblies.id, assemblies, { new: true })
            return res.json(updatedAssemblies)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params
            const assemblies = req.body
            if (!id) {
                return res.status(400).json({ message: 'Assemblies не указан' })
            }
            const updatedAssemblies = await Assemblies.findByIdAndUpdate(id, assemblies, { new: true })
            return res.json(updatedAssemblies)
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
            const assemblies = await Assemblies.findByIdAndDelete(id)
            return res.json({ message: 'Assembly deleted successfully', assemblies })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }
}

export default new assembliesController()
