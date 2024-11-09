import Router from "express";
import ConfigsController from "../Controllers/configsController.js";

const router = new Router()

router.post('/configs', ConfigsController.create)
router.get('/configs', ConfigsController.getAll)
router.get('/configs/:id', ConfigsController.getOne)
router.put('/configs', ConfigsController.update)
router.patch('/configs/:id', ConfigsController.patch)
router.delete('/configs/:id', ConfigsController.delete)

export default router