import express from "express";
import * as controllers from '../controllers/authenticationController.js';
import * as employe from "../controllers/employeController.js";

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

router.post("/", controllers.connexion);
router.post("/inscription", controllers.protect, employe.createEmploye);

export default router;