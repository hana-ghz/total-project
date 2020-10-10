const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commandSchema= new Schema({
   
    listFoodIds:{
        type: String , 
        required : true
    },
    image:{
        type:Buffer , 
        required : true
    }, 
    client:{
        type:Schema.Types.Mixed,
        required: true
    }
} , {timestamps: true});


const commmand= mongoose.model('commmand' , commandSchema);
module.exports= commmand;
