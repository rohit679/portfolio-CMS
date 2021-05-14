import { createAnApp, finishApp } from './app';
import './modules/db/connection';
import contentModule from './modules/contents';

const PORT = 8000;

const app = createAnApp();

contentModule.init(app);

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