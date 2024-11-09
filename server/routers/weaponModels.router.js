import Router from "express";
import weaponModelsController from "../Controllers/weaponModelsController.js";

const router = new Router()

router.post('/weapon%20models', weaponModelsController.create)
router.get('/weapon%20models', weaponModelsController.getAll)
router.get('/weapon%20models/:id', weaponModelsController.getOne)
router.put('/weapon%20models', weaponModelsController.update)
router.patch('/weapon%20models/:id', weaponModelsController.patch)
router.delete('/weapon%20models/:id', weaponModelsController.delete)

export default router