// schema create cheyyan model il pokuka

const projects=require('../Models/projectSchema')
// -----------------------------------------------------------------------------------------------------------------------------------
// 1st
// 1  add-project logic
exports.addProject=async(req,res)=>
{
    console.log("inside the addProject method");
    // const {title,language,github,livelink,overview,projectImage}=req.body ------>>> idh venda bcz projectImage varulla bcz
    // its in file format so to solve this we use Multer Middleware
    const {title,language,github,livelink,overview}=req.body
    const projectImage =req.file.filename
    const userId=req.payload //userId:existingUser._id -----is the payload
    console.log(title,language,github,livelink,overview,projectImage)
    console.log(userId);

   // 2
    try
    {
        const existingProject= await projects.findOne({github})
        if(existingProject)
        {
        res.status(400).json("Project already exists")
        
        }

        else
        {
            const newProject=new projects({title,language,github,livelink,overview,projectImage,userId})
            await newProject.save()
            res.status(200).json(newProject)
        }
    }
    catch(err)
    {
        res.status(401).json({message:err.message})
    }

   
}
// go to router and give code and import projectController 


// --------------------------------------------------------------------------------------------------------------------------
//  2nd  view project logic

//1 get a particular project details----->>> oru user nta full projects

  exports.getAProject=async(req,res)=>
  {
    //  get userId
    const userId=req.payload
    try
    {
        const AProject=await projects.find({userId})// findOne kodthal oru user nta oru project varullu so find kodkkuu
        if(AProject)
        {
            res.status(200).json(AProject)
        }
        else
        {
            res.status(401).json("Can't find project")
        }
    }
    catch(err)
    {
        res.status(401).json({message:err.message});
    }
  }

//2 get three  project details from home project (random aayett)
  exports.getHomeProjects=async(req,res)=>
  {
    try
    {
        const HomeProject =await projects.find().limit(3)
        if(HomeProject)
        {
            res.status(200).json(HomeProject)
        }
        else
        {
            res.status(401).json("cant find project")
        }
    }
    
    catch(err)
    {
        res.status(401).json({message:err.message});
    }
  }

// 3--- get all users  project details

  exports.getAllUserProjects=async(req,res)=>//1
  {
    const searchKey=req.query.search//2
    console.log(searchKey)//2

    //3 case sensitivity
         let query = {}
         if(searchKey)
         {
            query.language= {$regex: searchKey, $options:"i"}
         }
    
    // const query={
    //     language:{$regex:searchKey,$options:'i'}// i indicates case sensitivity options
        // language base aayitt aanu searching varunne


        try{
            const AllUserProjects =await projects.find(query)
            if(AllUserProjects.length>0)
            {
                res.status(200).json(AllUserProjects)
            }
            else
            {
                res.status(401).json("Cant find projects");
            }
        }
        catch(err)
        {
            res.status(401).json({message:err.message});
        }
    }
    
  

  // 4 delete user project
  exports.deleteUserProject = async(req,res) =>
  {
    const {pid} =req.params // get project id

    try
    {
        const deleteUserProject=await projects.findOneAndDelete({_id:pid})
        //Creates a findOneAndDelete query: atomically finds the given document, deletes it, and returns the document as it was before deletion.
        res.status(200).json(deleteUserProject)
    }
    catch(err)
    {
        res.status(401).json({message:err.message})
    }
  }

  //5 update user Projects
  exports.updateUserProject=async(req,res)=>
    {
        const {title,language,github,livelink,overview,projectImage}=req.body
        userId=req.payload // particular user nta project
        const {pid} =req.params
        const uploadImage=req.file?req.file.filename:projectImage

        try
        {
            // find particular project and update  the data and save the changes

            const updateProject =await projects.findByIdAndUpdate({_id:pid},{title,language,github,livelink,overview,projectImage:uploadImage,userId})
            await updateProject.save()
            res.status(200).json(updateProject)
        }
        catch(err)
        {
            res.status(401).json({message:err.message})        }
    }
  

  





