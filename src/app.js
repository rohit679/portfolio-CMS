import express from 'express';
import bodyParser from 'body-parser';
import createError from 'http-errors-lite';
import { StatusCodes } from 'http-status-codes';
import path from 'path';
import cors from 'cors';

export const createAnApp = () => {
    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use(cors({
        origin : 'http://rohit-portfolio-dashboard.herokuapp.com',
        optionsSuccessStatus : 200,
        method : 'GET, PUT, DELETE, POST',
        credentials : true,
    }));
    app.use(express.static(__dirname + '/public'));
    app.set('views', path.join(__dirname, './views'));
    app.set('view engine', 'ejs');
    app.use('/css',express.static(__dirname+'/public/css'));
    app.use('/scripts',express.static(__dirname+'/public/scripts'));
    app.use('/images',express.static(__dirname+'/public/images'));
    app.use('/js',express.static(__dirname+'/public/js'));
    app.use('/styles',express.static(__dirname+'/public/styles'));
    return app;
};

export const notFoundHandler = (req, res, next) => {
    next(createError(StatusCodes.NOT_FOUND, `${req.originalUrl} route not found.`));
};

export const errorHandler = (err, req, res, _next) => {
    res.status(err.statusCode || 500).send({
        msg : 'Something unwanted occured....',
        error : err.message
    });
};

export const finishApp = (app) => {
    app.use(notFoundHandler);
    app.use(errorHandler);
};