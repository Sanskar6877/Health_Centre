const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1:27017/healthcenter')
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})
const loginadmin=new mongoose.Schema({
    name:{
        type: String,
        required:true
    }, 
    date:{
        type: Date,
        required:true
    }, 
    email:{
        type: String,
        required:true
    }, 
    phone:{
        type: String,
        required:true
    }, 
    age:{
        type: String,
        required:true
    }, 
    symptoms:{
        type: String,
        required:true
    }, 
    days:{
        type: String,
        required:true
    }
   
}) 
 
const loginadmin2=new mongoose.model("appointment",loginadmin)
 module.exports=loginadmin2