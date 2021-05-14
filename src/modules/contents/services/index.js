import contentModel from '../models';

const contentServices = {}

contentServices.getAllContents = async () => await contentModel.find({});

contentServices.getAContent = async (id) => await contentModel.findById(id);

contentServices.servePage = async () => {
    const data = await contentModel.find({});
    const content = {};
    data.forEach(item => {
        content[item.element_id] = item.data;
    });
    return content;
}

contentServices.addContent = async (data) => await contentModel.create(data);

contentServices.updateContent = async ({id, data}) => await contentModel.findByIdAndUpdate(id, data);

contentServices.deleteContent = async (id) => await contentModel.findByIdAndDelete(id);

export default contentServices;