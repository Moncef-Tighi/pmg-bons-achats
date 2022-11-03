import express from "express";
import * as controllers from '../controllers/bonController.js';

const router = express.Router();

router.post("/creation", controllers.createBon);

export default router;