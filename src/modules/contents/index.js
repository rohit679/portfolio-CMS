import contentRouter from "./routers";
import {Router} from "express";

const router = Router();
router.use('/content', contentRouter);

const contentModule = {
    init: (app) => {
        app.use(router);
        console.log("content module loaded");
    },
}

export default contentModule;