const User = require('../models/user')
const Error = require('../utils/errorHandler');
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