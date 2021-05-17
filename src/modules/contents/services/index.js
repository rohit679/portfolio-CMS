import nodemailer from 'nodemailer';
import { contentModel, contactDataModel } from '../models';

const getAllContents = async () => await contentModel.find({});

const getAContent = async (id) => await contentModel.findById(id);

const servePage = async () => {
    const data = await contentModel.find({});
    const content = {};
    data.forEach(item => {
        if(item.element_id === "div2List1Percent" || item.element_id === "div2List2Percent" || item.element_id === "div2List3Percent" || 
           item.element_id === "div2List4Percent" || item.element_id === "div2List5Percent" || item.element_id === "div2List6Percent") {
            content[item.element_id] = parseInt(item.data);
           }
        else {
            content[item.element_id] = item.data;
        }
    });
    return content;
}

const addContent = async (data) => await contentModel.create(data);

const updateContent = async ({id, data}) => await contentModel.findOneAndUpdate({element_id : id}, data);

const deleteContent = async (id) => await contentModel.findByIdAndDelete(id);

const getContactData = async (email) => contactDataModel.findOne({email : email});

const getAllContactData = async () => contactDataModel.find({});

const getcontactDataList = async(pageNumber) => {
    const size = 10;
    const contactLists = await contactDataModel
      .find({},{__v : 0})
    //   .sort({date:-1})
      .skip((pageNumber-1)*size)
      .limit(size);
    return contactLists;
}

const setContactData = async ({name, email, message}) => {
  await contactDataModel.create({name, email, message});
  await sendMail({name, email, message});
};

const sendMail = async ({name, email, message}) => {
  const to = "rohitprasad25061999@gmail.com";
  const subject = `Inqueiry data by ${name}`;
  const body = "name : " + name + "\nemail : " + email + " \nmessage : " + message;

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rohit.prasad@plaxonic.com',
        pass: 'Rohit@9897'
      }
    });
    var mailOptions = {
      from: 'rohit prasad',
      to: to,
      subject:subject,
      text:body,
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      }
      else {
        console.log("mail sent");
        alert("Mail Sent Successfully");
      } 
    });
}

const updateContactData = async ({email, data}) => contactDataModel.updateOne({email : email}, {message : message});

const deleteContactData = async (id) => contactDataModel.findByIdAndDelete(id);


export const contentServices = {getAContent, getAllContents, servePage, addContent, updateContent, deleteContent}; 
export const contactDataServices ={getContactData, getAllContactData, getcontactDataList, setContactData};