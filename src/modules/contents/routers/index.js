import { httpHandler } from '../../common/http-handler';
import { Router } from 'express';
import contentServices from '../services';

const router = Router();

router.get(
    '/get-a-content/:id',
    httpHandler(async (req, res) => {
        const id = req.params.id;
        const data = await contentServices.getAContent(id);
        res.send(data);
    })
);

router.get(
    '/get-all-content',
    httpHandler(async (req, res) => {
        const data = await contentServices.getAllContents();
        res.send(data);
    })
);

router.get(
    '/get-data',
    httpHandler(async (req, res) => {
        const data = await contentServices.servePage();
        res.send(data);
    })
);

router.post(
    '/add-content',
    httpHandler(async (req, res) => {
        const data = req.body;
        await contentServices.addContent(data);
        res.send({
            message : 'Data successfully added'
        });
    })
);

router.put(
    '/update-content',
    httpHandler(async (req, res) => {
        const {id, data} = req.body;
        await contentServices.updateContent({id, data});
        res.send({
            'message' : 'Data successfully updated'
        });
    })
);

router.delete(
    '/delete-content/:id',
    httpHandler(async (req, res) => {
        const id = req.params.id;
        await contentServices.deleteContent(id);
        res.send({
            message : 'Data successfully deleted'
        });
    })
);

export default router;
