const mongoose = require('mongoose');
const url = process.env.MONGO_URl;

mongoose.connect(url)
.then(()=>{
    console.log('MongoDB connection Successfully...');
}).catch((err)=>{
    console.log('Connection Failed...', err);
})