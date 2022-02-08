import express from 'express';
import multer  from 'multer';
import pql from './db/repository';



const Port = process.env.PORT || 5000;
const MaxFileSize=5*1000*1000;
const DominUrl=process.env.DOMAIN_URL|| "http://localhost:"+Port;

const app = express();
const rootPath=__dirname.substring(0,__dirname.lastIndexOf('/'));
app.use(express.static('public'));

const storage=multer.memoryStorage();
const buffer=new Map<string,Buffer>();

const upload=multer({
  storage:storage,
  fileFilter:(req,file,callback)=>{
    const ext= file.originalname.substring(file.originalname.lastIndexOf("."));

    if(ext !=='.png' && ext !== '.jng' && ext !=='.gif' && ext !=='.jpeg')
      return callback(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
    
    if(file.size>5.1e+2)
      return callback(new multer.MulterError("LIMIT_FILE_SIZE"));
    callback(null,true);
  },
  limits:{
    fileSize:MaxFileSize,
    files:1
  }
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


app.post("/api/upload-img",upload.single('photo') ,async (req,res)=>{
  
  const filename=req.file?.originalname;
  const namefile=Math.floor(Math.random()*975244)+200;
  const data=req.file.buffer;

  await pql.savePhoto(namefile,data);

  //buffer.set(filename,data);
  //const data=pql.getPhoto(filename);
  res.json({imgLink :DominUrl+"/api/img/"+ namefile})
})

app.get("/api/img/:id",async (req,res)=>{
  //res.set({'Content-Type':'application/png'});
  const photoName=parseInt(req.params.id);

  const data=await pql.getPhoto(photoName);

  //res.json({imgLink :"http://localhost:"+Port+"/api/img/"+ filename})
  res.send(data);
});


app.use((err:any, req:any, res:any, next:any)=> {
  
  if(err instanceof multer.MulterError)
    if(err.code ==='LIMIT_FILE_SIZE')
      return res.status(400).json({message:'Max images size is 5Mbytes'})
    if(err.code === 'LIMIT_UNEXPECTED_FILE')
      return res.status(400).json({message:'Only images are allowed'})
  if(err)
   return res.status(400).json({message:err.message});
  
  res.status(404).json({message: "Not Found"});
});


//server
app.listen(Port, () => {
  console.log(`server listening at ${DominUrl}`)
});
