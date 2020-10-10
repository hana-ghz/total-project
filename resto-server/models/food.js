const { text } = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema= new Schema({
    name:{
        type: String , 
        required : true
    },
    category:{
        type: String, 
        required : true
    },
   
    descrip:{
        type:String , 
        required : true
    },
    price:{
        type:Number , 
        required : true
    },
   
} , {timestamps: true});


const food= mongoose.model('food' , foodSchema);
module.exports= food;
