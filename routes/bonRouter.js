import express from "express";
import * as controllers from '../controllers/bonController.js';

const router = express.Router();

router.post("/creation", controllers.createBon);
router.get("/", controllers.readListe);

export default router;