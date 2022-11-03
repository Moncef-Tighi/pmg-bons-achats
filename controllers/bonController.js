import { catchAsync } from './errorController.js';
import * as model from '../models/bon.js';
import createError from 'http-errors';
function stringToDate(_date,_format,_delimiter)
{
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formatedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formatedDate;
}


export const createBon = catchAsync(async (request, response,next)=> {
    const type = request.body.type;
    const numeroBon = request.body.numeroBon;
    const valeur = request.body.valeur;
    const dateExpiration = request.body.dateExpiration;
    const date = dateExpiration ? stringToDate(dateExpiration, "dd-MM-yyyy", "-") : null
    if (!type || !numeroBon || !valeur) return next(createError(400, "Une information obligatoire n'a pas été fournie"))
    if (type==="bonAchat" && dateExpiration) return next(createError(400, "Un bon d'achat ne peut pas avoir de date d'expiration"))
    if (type==="carteCadeau" && date<Date.now()) return next(createError(400, "Une carte cadeau ne peut pas être déjà expiré"))
    const validation = await model.insertionBon(numeroBon, valeur, type, date);
    return response.status(201).json({
        status: "ok",
        message : "Le nouveau bon a bien été créé",
        body : validation
    });
});

export const readListe = catchAsync(async (request, response,next)=> {

    const page = request.query.page || 1
    const data = await model.listeBon(Number(page.split("=")[1]));
    return response.status(200).json({
        status: "ok",
        totalSize : data.total[0]["COUNT(*)"],
        body : data.rows
    })


})