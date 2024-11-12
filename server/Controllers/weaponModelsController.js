import WeaponModel from "../Schemas/WeaponModel.js"

class weaponModelController {
    async create(req, res) {
        try {
            const { title, content, pictures, systemRequirements, assemblyFeatures, description } = req.body
            const weaponModel = await WeaponModel.create({ title, content, pictures, systemRequirements, assemblyFeatures, description })
            return res.status(201).json({ message: 'Assembly created successfully', weaponModel })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async getAll(req, res) {
        try {
            const weaponModel = await WeaponModel.find()
            return res.json(weaponModel)
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
            const weaponModel = await WeaponModel.findById(id)
            return res.json(weaponModel)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async update(req, res) {
        try {
            const weaponModel = req.body
            if (!weaponModel || !weaponModel.id) {
                return res.status(400).json({ message: 'WeaponModel не указан' })
            }
            const updatedWeaponModel = await WeaponModel.findByIdAndUpdate(weaponModel.id, weaponModel, { new: true })
            return res.json(updatedWeaponModel)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async patch(req, res) {
        try {
            const { id } = req.params
            const weaponModel = req.body
            if (!id) {
                return res.status(400).json({ message: 'WeaponModel не указан' })
            }
            const updatedWeaponModel = await WeaponModel.findByIdAndUpdate(id, weaponModel, { new: true })
            return res.json(updatedWeaponModel)
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: 'Id не указан' })
            }
            const weaponModel = await WeaponModel.findByIdAndDelete(id)
            return res.json({ message: 'Assembly deleted successfully', weaponModel })
        } catch (e) {
            console.error(e)
            return res.status(500).json({ message: 'Internal Server Error', error: e.message })
        }
    }
}

export default new weaponModelController()
