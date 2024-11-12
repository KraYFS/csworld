import Router from "express";
import SoundsController from "../Controllers/soundsController.js";

const router = new Router()

router.post('/sounds', SoundsController.create)
router.get('/sounds', SoundsController.getAll)
router.get('/sounds/:id', SoundsController.getOne)
router.put('/sounds', SoundsController.update)
router.patch('/sounds/:id', SoundsController.patch)
router.delete('/sounds/:id', SoundsController.delete)

export default router