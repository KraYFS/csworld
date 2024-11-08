import Router from "express";
import assembliesController from "../Controllers/assembliesController.js";

const router = new Router()

router.post('/assemblies', assembliesController.create)
router.get('/assemblies', assembliesController.getAll)
router.get('/assemblies/:id', assembliesController.getOne)
router.put('/assemblies', assembliesController.update)
router.patch('/assemblies/:id', assembliesController.patch)
router.delete('/assemblies/:id', assembliesController.delete)

export default router