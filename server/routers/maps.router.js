import Router from "express";
import MapsController from "../Controllers/mapsController.js";

const router = new Router()

router.post('/maps', MapsController.create)
router.get('/maps', MapsController.getAll)
router.get('/maps/:id', MapsController.getOne)
router.put('/maps', MapsController.update)
router.patch('/maps/:id', MapsController.patch)
router.delete('/maps/:id', MapsController.delete)

export default router