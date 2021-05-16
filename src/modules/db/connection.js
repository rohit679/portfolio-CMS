const mongoose = require('mongoose');

// const URL = 'mongodb://localhost/portfolio';
const URL = "mongodb+srv://rohit:sjsVdQqfNK36icXJ@cluster0.ukw3x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
(async () => {
    try {
        await mongoose.connect(URL, {
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