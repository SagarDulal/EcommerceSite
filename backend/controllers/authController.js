const User = require('../models/user')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')

// Register a user => /api/v1/register
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
    sendToken(user,200,res);
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
    sendToken(user, 200, res)

})
// Forgot password => /api/v1/password/forgotPassword
exports.forgotPassword = catchAsyncErrors (async(req,res, next)=>{
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found in the database", 404))
    }
    // Get Reset token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false})

    // Create Reset Password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\n If you have not requested this email, then please ignore it `
    
    try{
        await sendEmail({
            email: user.email,
            subject: "Password recovery", 
            message
        })
        res.status(200).json({success:true, message:`Email sent to: ${user.email}`})
    }catch(error){
        user.getResetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message,500));
    }
})

// Logging out user => /api/v1/logout
exports.logoutUser = catchAsyncErrors(async(req,res,next)=>{
    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success:true,
         message: "Logged out"
        })
})