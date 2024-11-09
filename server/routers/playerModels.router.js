import Router from "express";
import PlayerModelsController from "../Controllers/playerModelsController.js";

const router = new Router()

router.post('/Player%20models', PlayerModelsController.create)
router.get('/Player%20models', PlayerModelsController.getAll)
router.get('/Player%20models/:id', PlayerModelsController.getOne)
router.put('/Player%20models', PlayerModelsController.update)
router.patch('/Player%20models/:id', PlayerModelsController.patch)
router.delete('/Player%20models/:id', PlayerModelsController.delete)

export default router