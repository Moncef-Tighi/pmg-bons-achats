import { catchAsync } from './errorController.js';
import * as model from '../models/employe.js';
import {hash, genSalt} from 'bcrypt';
import createError from 'http-errors';

const hashPassword = async function(clearTextPassword) {
    const salt = await genSalt(10);
    return await hash(clearTextPassword, salt);
};

export const createEmploye = catchAsync( async function(request, response, next) {
    const email = request.body.email;
    const admin = request.body.admin || false;
    if (!email || !request.body.password) {
        return next(createError(400, `Impossible de créer l'employé : une information obligatoire n'a pas été fournit.`))
    }
    const password = await hashPassword(request.body.password);
    const data = await model.newEmploye(email, password, admin);
    delete data.password;
    return response.status(201).json({
        status: "ok",
        message : "L'employé a bien été créé",
        body : data
    });

});
