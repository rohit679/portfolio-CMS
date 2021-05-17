import mongoose from 'mongoose';

const contentSchema = mongoose.Schema({
    element_id : {
        type : String,
        required : true,
        unique : true
    },
    data : {
        type : String,
        required : true
    }
});

const contactDataSchema = mongoose.Schema({
    name : {type : String, required : true},
    email : {type : String, required : true},
    message : {type : String, required : true}
})

export const contentModel = mongoose.model('contents', contentSchema);

export const contactDataModel = mongoose.model("contact_data", contactDataSchema);