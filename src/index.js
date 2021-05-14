import { createAnApp, finishApp } from './app';
import { httpHandler } from './modules/common/http-handler';
import './modules/db/connection';
import contentModule from './modules/contents';
import contentServices from './modules/contents/services';

const PORT = 8000;

const app = createAnApp();

contentModule.init(app);

app.get('/',httpHandler(async (req, res, next) => { 
    const promises = await contentServices.servePage();
    console.log(promises);
    res.render('index',promises);
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