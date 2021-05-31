import { createAnApp, finishApp } from './app';
import { httpHandler } from './modules/common/http-handler';
import './modules/db/connection';
import contentModule from './modules/contents';
import authModule from './modules/auth';
import {contentServices} from './modules/contents/services';

const PORT = 8000;

const app = createAnApp();

authModule.init(app);

contentModule.init(app);

app.get('/',httpHandler(async (req, res, next) => { 
    const data = await contentServices.servePage();
    // console.log(data);
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