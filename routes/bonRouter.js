import express from "express";
import { protect } from "../controllers/authenticationController.js";
import * as controllers from '../controllers/bonController.js';
import passport from "passport";
import {Strategy} from 'passport-jwt'
import {ExtractJwt} from 'passport-jwt'
import { AuthStrategy } from "../controllers/authenticationController.js";
import generateKeyPairSync from '../util/generateKeyPair.js';
import {readFileSync} from 'fs';
import {resolve} from 'path';

const router = express.Router();

router.use(passport.initialize()) 

try {
    var publicKey = readFileSync(resolve('key_public.pem'), {encoding: 'utf-8'});
} catch(error) {
    generateKeyPairSync();
    var publicKey = readFileSync(resolve('key_public.pem'), {encoding: 'utf-8'});
}
const authStrategyOptions = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: publicKey,
    algorithms : ['RS256'],
    jsonWebTokenOptions : {
        maxAge : process.env.JWT_EXPIRATION || '1d'
    }
}

passport.use('jwt', new Strategy(authStrategyOptions, AuthStrategy));
router.post("/creation", protect, controllers.createBon);
router.get("/", controllers.readListe);

export default router;