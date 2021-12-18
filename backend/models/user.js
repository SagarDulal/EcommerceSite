const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true, "Please enter your name"],
        maxLength:[30,"Your name cannot exceed 30 characters"]
    },
    email:{
        type: String,
        required:[true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"]
    },
    password:{
        type: String,
        required:[true, "Please enter your password"],
        minLength:[6,"Please enter at least 6 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type: String,
    
        },
        url:{
            type: String,
        },
        role:{
            type: String,
            default: 'user'
        },
        createdAt:{
            type: Date,
            default: Date.now
        }
    },
    resetPassword: String,
    resetPasswordExpire : Date
})

// Encrypting password before saving changes
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) {
        next()
    }
    this.password = await bcrypt.hash(this.password,8)
})
// Compare user password 

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}
// Return JWT token
userSchema.methods.getJWtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}
module.exports = mongoose.model('User', userSchema);