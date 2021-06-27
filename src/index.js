import { createAnApp, finishApp } from './app';
import { httpHandler } from './config/http-handler';
import './config/connection';
import contentModule from './modules/contents';
import {contentServices} from './modules/contents/services';

const PORT = process.env.PORT || 8000;

const app = createAnApp();

contentModule.init(app);

app.get('/',httpHandler(async (req, res, next) => { 
    const data = await contentServices.servePage();
    // console.log("data : ", data);
    res.render('index',data);
}));

finishApp(app);

(async () => {
    try {
        await app.listen(PORT);
        console.log('-- Server Started --');
    } 
    catch(e) {
        console.log(e.message);
        process.exit(1);
    }
})();