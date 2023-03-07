

var express = require("express"); 
var router = express.Router(); 
const app=express();  
// var con = require('../connection');  



const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

 app.use("/assets",express.static("assets")); 
 app.set("view engine" , "ejs");
 app.use(express.static(__dirname + '/views'));

const { render } = require('ejs');
const path= require("path");
require("../routes/db/conn");
app.set('views', path.join(__dirname, 'views'));
// const port = process.env.PORT || 5000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");
app.use(express.static(static_path));


var loginadmin=require("./loginadmin")
var loginstudent=require("./loginstudent")
var logindoctor=require("./logindoctor");

app.use(express.urlencoded({ extended: false }));

router.get("/", function(req,res,next){
   res.render("homemain");
});  

router.get("/homemain",function(req,res,next) {
   res.render("homemain");
});   

router.get("/doctorlogin", function(req,res,next) {
    res.render("doctorlogin");
 });
 router.get("/studentlogin",function(req,res,next) {
    res.render("studentlogin");
 });
 router.get("/adminlogin", function(req,res,next) {
    res.render("adminlogin");
 });   
 router.get("/appointment",function(req,res,next) {
   res.render("appointment");
});  


 //adminlogin page

 router.post("/adminlogin",async function(req,res){ 
  
   try{ 
      // console.log(req.body);  
      const check=await loginadmin.findOne({
       email:req.body.email
      }) 
      
      if(check){
       
      if(check.password===req.body.password){
         res.render("admindashboard")
      }else{
         res.render("invalid1")
      } }else{
         res.render("invalid1")
      }
   }catch{
      res.send("error")
   }
})  

//student login page

router.post("/studentlogin",async function(req,res){ 
  
   try{ 
      // console.log(req.body);  
      const check=await loginstudent.findOne({
       email:req.body.email
      }) 
      
      if(check){
       
      if(check.password===req.body.password){
         res.render("studentdashboard")
      }else{
         res.render("invalid2")
      } }else{
         res.render("invalid2")
      }
   }catch{
      res.send("error")
   }
})  

//student login page

router.post("/doctorlogin",async function(req,res){ 
  
   try{ 
      // console.log(req.body);  
      const check=await logindoctor.findOne({
       email:req.body.email
      }) 
      
      if(check){
       
      if(check.password===req.body.password){
         res.render("doctordashboard")
      }else{
         res.render("invalid3")
      } }else{
         res.render("invalid3")
      }
   }catch{
      res.send("error")
   }
}) 


 


module.exports=router;


 