import express, { NextFunction } from 'express';
import multer, { MulterError }  from 'multer';
import path from 'path/posix';

const Port = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));

const upload=multer({
  dest:"./upload",
  fileFilter:(req,file,callback)=>{
    const ext= path.extname(file.originalname);
    if(ext !=='.png' && ext !== '.jng' && ext !=='.gif' && ext !=='.jpeg')
      return callback(new MulterError("LIMIT_UNEXPECTED_FILE", ));
    callback(null,true);
  },
});

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//route




//api
app.post("/api/data", (req, res) => {
  console.log(req);
  return res.sendStatus(200);
});


app.post("/api/upload-img",upload.single('photo') ,(req,res)=>{
  
  const filename=req.file?.filename;
  res.json({imgLink :"http://localhost:"+Port+"/api/img/"+ filename})
})

app.get("/api/img/:id",(req,res)=>{
  res.sendFile("/home/ahmed/development/node/image-uploader-server/upload/"+req.params.id);
});


app.use((err:any, req:any, res:any, next:NextFunction)=> {
  
  if(err instanceof multer.MulterError)
    return res.status(400).json({message:'Only images are allowed'})
  if(err)
   return res.status(400).json({message:err.message});
  
  res.status(404).json({message: "Not Found"});
});


//server
app.listen(Port, () => {
  console.log(`server listening at http://localhost:${Port}`)
});
