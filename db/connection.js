const env = require('./config');
const mongoose = require('mongoose');
mongoose.connect(env.url,()=>{
    console.log('user connected');
})
module.exports = mongoose;
//