const app = require('./app')
const connectDB = require('./config/database')


const dotenv = require('dotenv')

// Setting up the config file

dotenv.config({path: 'backend/config/config.env'})


// Connecting to the database

connectDB();


app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})