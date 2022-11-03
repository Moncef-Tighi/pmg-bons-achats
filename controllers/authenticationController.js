import { catchAsync } from './errorController.js';
import * as model from '../models/employe.js';
import createError from 'http-errors'

import {readFileSync} from 'fs';
import {resolve} from 'path';
import generateKeyPairSync from '../util/generateKeyPair.js';

import {compare} from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';

try {
    var privateKey = readFileSync(resolve('key_prive.pem'), {encoding: 'utf-8'});
} catch(error) {
    generateKeyPairSync();
    var privateKey = readFileSync(resolve('key_prive.pem'), {encoding: 'utf-8'});
}


const signJwt = function(employe) {
    const token = jwt.sign({
        employe_id : employe.id_employe,
        iat: Math.floor(Date.now() / 1000) - 30
    }, privateKey, {
        algorithm: 'RS256',
        expiresIn : process.env.JWT_EXPIRATION || '10d',
    })
    return token;
};

export const connexion = catchAsync( async function(request, response, next) {

    const email = request.body.email;
    const password = request.body.password;
    if (!email | !password) return next(createError(400, `Email ou mot de passe introuvable`))
    const employe = await model.employeLogin(email);
    if (!employe) return next(createError(401, `Email incorrecte ou employé inexistant`));
    if (await compare(password, employe.password)) {
        const token = signJwt(employe)
        delete employe.password;
        return response.status(200).json({
            status:"ok",
            token,
            employe
        });
    } else {
        return next(createError(401, `Mot de passe incorrect`))
    }

    
});



export const AuthStrategy = async function(jwt_payload, done) {
    //C'est une fonction qui est utilisé par Passport pour vérifier les informations du JWT après avoir vérifié sa signature
    try {
        
        const employe = await model.oneEmploye(jwt_payload.employe_id);
        if (!employe || !employe.active) return done(null, false, `le token est invalide ou expiré`);

        return done(null, employe);
    } catch(error) {
        return done (error, false)
    }

};


export const protect = passport.authenticate('jwt', {session: false});

export const restrict= function(...roles) {
    return (request, response, next)=> {
        const permissions = request.user.permissions;
        for (const permission of permissions) {
            if (roles.includes(permission)) return next();
        }
        return next(createError(403, `l'employé n'a pas le droit d'effectuer cette action`));
    }
}