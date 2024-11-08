import Router from "express";
import weaponModelsController from "../Controllers/weaponModelsController.js";

const router = new Router()

router.post('/weaponModels', weaponModelsController.create)
router.get('/weaponModels', weaponModelsController.getAll)
router.get('/weaponModels/:id', weaponModelsController.getOne)
router.put('/weaponModels', weaponModelsController.update)
router.patch('/weaponModels/:id', weaponModelsController.patch)
router.delete('/weaponModels/:id', weaponModelsController.delete)

export default router