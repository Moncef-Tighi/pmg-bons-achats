import { catchAsync } from './errorController.js';
import * as model from '../models/bon.js';
import createError from 'http-errors';


export const createBon = catchAsync(async (request, response)=> {
    const type = request.body.type;
    const numeroBon = request.body.numeroBon;
    const valeur = request.body.valeur;
    const dateExpiration = request.body.dateExpiration;
    if (!type || !numeroBon || !valeur) return next(createError(400, "Une information obligatoire n'a pas été fournie"))
    if (type==="bonAchat" && dateExpiration) return next(createError(400, "Un bon d'achat ne peut pas avoir de date d'expiration"))
    const validation = await model.insertionBon(numeroBon, valeur, type, dateExpiration);

    return response.status(201).json({
        status: "ok",
        message : "Le nouveau bon a bien été créé",
        body : validation
    });
});