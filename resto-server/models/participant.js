const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const participantSchema= new Schema({
    name:{
        type: String, 
        required : true
    },
    email:{
        type: String , 
        required : true
    },
    image:{
           data :Buffer,
            contentType:String
    },
    
} , {timestamps: true});


const participant= mongoose.model('participant' , participantSchema);
module.exports= participant;
