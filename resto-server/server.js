const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path= require('path');
const bodyParser= require('body-parser');
const { getFips } = require('crypto');
const participantModel = require('./models/participant');
const { fstat } = require('fs');

const food= require('./models/food');

var fs = require('fs'); 
const { promiseImpl } = require('ejs');




 
 

const storage = multer.diskStorage({
  destination:'./public/uploads' , 
  filename: function(req , file , cb ){
    cb(null , file.fieldname + '-' + Date.now()+ path.extname(file.originalname))
  }
});

//intit upload
const upload= multer({
  storage: storage, 
  limits:{fileSize:1000000},
  fileFilter: function(req , file , cb ){
    checkFileType(file , cb);
  }
}).single('image');


//checkFiletype
const checkFileType = (file , cb)=>{
  //allowed extenstion 
  const filetypes = /jpeg|jpg|png|gif/;
  
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  //check mimee
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname){
    return cb ( null , true)
  }else{
    cb('Error : images only!');
  }
}



const app = express();
const port = 5000;
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/items_ordered' , (req , res)=>{
  let idItems =  req.query.idItems;
  const orders=[];
  console.log(idItems)

  Promise.all(
    idItems.map(id=>{
      food.findById(id)
        .then((result) => {
          console.log(result)
          orders.push(result)
          if(idItems.indexOf(id)=== idItems.length-1){
            res.send(orders)
            console.log("items orddered are: ")
            console.log(orders)
          }
          
        })
    })
  )
  


})

app.get('/Menu' , (req , res)=>{

  food.find()
   .then((result)=>{
    
     res.send(result)
   })
   .catch((err)=> console.log(err));
 
 
 });
 

app.set('view engine' , 'ejs');

app.use(express.static('./public'));


//connect to mongo
const dbURI ='mongodb+srv://hana:Dots@99@cluster0.doebp.mongodb.net/Resto-db?retryWrites=true&w=majority'
mongoose.connect(dbURI , {useNewUrlParser:true, useUnifiedTopology:true})
        .then((result)=> {console.log("connected to db")
                         
        }).catch((err)=> console.log(err));

        app.use(express.urlencoded({extended: true})); 
        app.use(express.json());   

// create a GET route
// app.get('/express_backend', (req, res) => {
//   console.log("GET received");
//   res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
//   console.log("GET responded to")
// });

app.post('/contestForm' , (req, res)=>{

  upload(req  , res , (err)=>{
    if (err){ 
      console.log(err)
      res.send('error');
  }  else{
     var obj = new participantModel();
      
        obj.name=req.body.name;
        obj.email=req.body.mail;
      
        obj.image.data= fs.readFileSync (path.join('./public/uploads/'+req.file.filename))

      obj.save()
        .then((result)=>{
          res.send('added with success')
        }).catch((err)=> console.log(err));
    }
  })

});
