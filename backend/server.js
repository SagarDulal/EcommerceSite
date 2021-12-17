const app = require('./app')
const connectDB = require('./config/database')
const dotenv = require('dotenv')


// Handle the uncaught exceptions 
process.on('uncaughtException', err =>{ 
    console.log(`Error: ${err.message}`);
console.log("Shutting down due to uncaught exception");
process.exit(1)
})

// Setting up the config file

dotenv.config({path: 'backend/config/config.env'})


// Connecting to the database

connectDB();


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});

// Handle the unhandled promise rejection
process.on('unhandledRejection', err =>{ console.log(`Error: ${err.message}`);
console.log('Shutting down the server due to unhandled promise rejection');
server.close(()=>{
    process.exit(1)
})
})