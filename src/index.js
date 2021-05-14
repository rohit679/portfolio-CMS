import { createAnApp, finishApp } from './app';
import './modules/db/connection';

const PORT = process.env.PORT || 8000;

const app = createAnApp();

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