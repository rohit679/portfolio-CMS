import mongoose from 'mongoose';

const mongoURL = 'mongodb://localhost/portfolio';
(async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser:true,
            useCreateIndex:true,
            useFindAndModify:false,
            useUnifiedTopology:true
        });
        console.log('Database connected successfully');
    }
    catch(err) {
        console.log('Database connection error');
    }
})();