import express from "express";
import * as controllers from '../controllers/authenticationController.js';
import * as employe from "../controllers/employeController.js";

const router = express.Router();

router.post("/", controllers.connexion);
router.post("/inscription", employe.createEmploye);

export default router;