const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const UserSchema = new Schema ({
            googleId: String,
                username: String,
                picture: String,
                email: String
})
const User = mongoose.model('newusershr',UserSchema);
module.exports = User;