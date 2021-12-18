const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// Register a user => /api/v1/ registered users
exports.registerUser = catchAsyncErrors(async(req,res)=>{
    const { name, email, password} = req.body;
    const user = await User.create({ 
        name,
        email,
        password,
        avatar:{
            public_id:'',
            url:''
        }
    })
    const token = user.getJWtToken();
    res.status(201).json({
        success: true,
        token
     })
})

// Login User => /api/v1/login

exports.loginUser = catchAsyncErrors (async(req,res, next)=>{
    const {email, password} = req.body;
    // Checks of email and password is entered by the user
    if(!email || ! password){
        return next(new ErrorHandler("Please enter email and  password",400))
    }

    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler("Invalid Email. USer not found in database", 401));
    }
    // Checking the password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched) {
        return next(new ErrorHandler("Password doesnot matches",401));
    }
    const token = user.getJWtToken();
    res.status(200).json({
        success: true,
        token
    })

})