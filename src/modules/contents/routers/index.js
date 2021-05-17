import { httpHandler } from '../../common/http-handler';
import { Router } from 'express';
import {contentServices, contactDataServices} from '../services';

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

router.get('/get-contact-data',httpHandler(async (req, res, next)=>{
    const {email} = req.body;
    const data = await contactDataServices.getContactData({email});
    res.status(200).send(data);
}));

router.get('/get-all-contact-data',httpHandler(async (req, res, next)=>{
    const data = await contactDataServices.getAllContactData();
    res.status(200).send(data);
}));

router.delete('/delete-contact-data/:id',httpHandler(async (req, res, next) => {
    const id = req.params.id;
    await contactDataServices.deleteContactData(id);
    res.status(200).send({"message" : "Contact Data Deleted Successfully"});
}));

router.post('/contact-data-list/:pageNumber', httpHandler(async(req, res, next) =>{
    const pageNumber = req.params.pageNumber;
    const result = await contactDataServices.getcontactDataList(pageNumber);
    res.send(result);
}));

router.get('/count-contact-data',httpHandler(async (req, res, next)=>{
    const count = await contactDataServices.countContactData();
    res.send({count});
}));

router.post('/add-contact-data',httpHandler(async (req,res, next)=>{
    const {name, email, message} = req.body;
    await contactDataServices.setContactData({name, email, message});
    res.status(200).send(`<!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="refresh" content="0;http://localhost:8000">
    </head>
    </html>`);
}));

export default router;
