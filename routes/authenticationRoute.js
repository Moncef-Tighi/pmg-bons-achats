import express from "express";
import * as controllers from '../controllers/authenticationController.js';

const router = express.Router();

router.post("/", controllers.connexion);

export default router;