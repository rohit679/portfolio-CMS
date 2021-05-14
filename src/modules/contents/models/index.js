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

export default mongoose.model('contents', contentSchema);