import Router from "express";
import GraffitiController from "../Controllers/graffitiController.js";

const router = new Router()

router.post('/graffiti', GraffitiController.create)
router.get('/graffiti', GraffitiController.getAll)
router.get('/graffiti/:id', GraffitiController.getOne)
router.put('/graffiti', GraffitiController.update)
router.patch('/graffiti/:id', GraffitiController.patch)
router.delete('/graffiti/:id', GraffitiController.delete)

export default router