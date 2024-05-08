//for setting path

//1 import express
const express =require('express')


// 2 import userController.js from controller
const userController = require('../controllers/userController')

//7  import projectController.js from controller
 const projectController=require('../controllers/projectController')

 //8 imports jwtMiddleware
 const jwtMiddleware=require('../Middlewares/jwtMiddleware')

 //9 imports multerMiddleware
 const multerConfig=require('../Middlewares/multerMiddleware')

 
//2.1 create router objcet of express to define path
const router = express.Router()

//3  register api call  path= http://localhost:4000/register
router.post('/register',userController.register)// register nta path

//4 login api call path= http://localhost:4000/login
router.post('/login',userController.login)// login nta path

//6 add project api call
router.post('/project/add-project' ,jwtMiddleware,multerConfig.single('projectImage') , projectController.addProject)

// 10 get a particular project deails api call
router.get('/project/get-aUser-project',jwtMiddleware,projectController.getAProject)

// 11  get 3 projects details for home project(random)
router.get('/project/home-project',projectController.getHomeProjects)

// 12  get all user projects details
router.get('/project/all-user-project',jwtMiddleware,projectController.getAllUserProjects)
 
// //13  delete user projects
router.delete('/project/delete-user-project/:pid',jwtMiddleware,projectController.deleteUserProject)

//  14 update user projects
router.put('/project/update-user-project/:pid',jwtMiddleware,multerConfig.single('projectImage'),projectController.updateUserProject)


//2.2
module.exports= router 