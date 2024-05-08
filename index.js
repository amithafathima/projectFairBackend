// ithil ithre ullu i think
//1 Loads .env file contents into process.env by defalut
require('dotenv').config()

//2 imprt express
const express= require('express')// express framework of nodejs for creating backend application.
//Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. 
//It allows developers to execute JavaScript code server-side, outside of a web browser

//3 import cors
const cors= require('cors')//  to connect different ports (backend and frontend port)


// 7 imports batabase
const db=require('./DB/connection')


//8 imports router
const router=require('./Routes/router') 

// 10 imports applicationMiddleware
// const applicationMiddleware = require('./Middlewares/applicationMiddleware')


//4 create a application using express
const pfserver =express()

//5 use 
pfserver.use(cors())
pfserver.use(express.json()) //return middleware that only parses

 

// 11 use appliationMiddleware
// pfserver.use(applicationMiddleware)


//9 use router
pfserver.use(router)

// 12 export image from backend(uploads)
pfserver.use('/uploads',express.static('./uploads'))


//6 port creation
const PORT= 4000 || process.env.PORT  //to run on any other port otherthan 4000
pfserver.listen(PORT,()=>{
    console.log('pfserver listening on port ' +PORT);
})

//http://localhost:4000/
pfserver.get('/',(req,res)=>{
    res.send("Welcome to project fair")
})

