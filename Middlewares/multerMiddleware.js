// step 1
const multer= require('multer')

// to store multer data, All words are predefined

//2
const storage=multer.diskStorage(
{
    destination:(req,file,callback)=>
    {
        callback(null,'./uploads')
    },
    // 3 :set image name
    filename:(req,file,callback)=>
    {
        const filename= `image-${Date.now()}-${file.originalname}`
        callback(null,filename);
    }
    
})

// 4
const fileFilter=(req,file,callback)=>
{
    if(file.mimetype==='img/png' || file.mimetype==='image/jpeg'|| file.mimetype==='image/jpg')
    {
    callback(null,true)

    }
    else
    {
        callback(null,false)
        return callback(new Error("Please upload follwing image extensions(png,jpeg,jpg"))
    }
    
}

//5
const multerConfig =multer({
    storage,fileFilter
})

//6
module.exports =multerConfig
