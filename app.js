import express from "express";
import helmet from 'helmet';
import createError from "http-errors";
import cors from 'cors';
import db from "./db.js";
import { errorHandeler } from "./controllers/errorController.js";
// import apiRouter from './routes/Router.js';
//import produitsRouter from './routes/articlesRouter.js';
import authRouter from "./routes/authenticationRoute.js";
import bonRouter from "./routes/bonRouter.js";

const app = express();

app.use(cors());
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json({
    limit : "100kb" //Limite la taille du body à 100kb
}));
+app.use(express.urlencoded({extended: true}));

// app.use('/plateforme/api/v1', apiRouter);
app.use(express.static("./dist/build"));
app.use("/api/login", authRouter);
app.use("/api/bon", bonRouter);
app.all('*', (request, response, next)=> {    
    //Ce middelware a pour seul but de catch les erreurs 404 
    return next(createError(404, `Erreur 404 : Impossible de trouver l'URL ${request.originalUrl} sur ce serveur`))
});

app.use(errorHandeler);

const port = process.env.PORT || 2000;
app.listen(port, ()=> {
    console.log(`Server ouvert sur le port ${port}`);
});

(async () => {
    
    const [rows] = await db.query("SELECT 1+1")
    console.log(rows);
  })();