const express = require("express");
const app= express();
const path= require("path");
require("./db/conn");
const port = process.env.PORT || 5000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path); 

const loginadmin=require("./loginadmin")
const loginstudent=require("./loginstudent")
const logindoctor=require("./logindoctor")
app.use(express.urlencoded({ extended: false }));

app.get("/", (req,res)=> {
   res.render("homemain");
});  
app.get("/homemain", (req,res)=> {
   res.render("homemain");
});   

app.get("/doctorlogin", (req,res)=> {
    res.render("doctorlogin");
 });
 app.get("/studentlogin", (req,res)=> {
    res.render("studentlogin");
 });
 app.get("/adminlogin", (req,res)=> {
    res.render("adminlogin");
 });   
 app.get("/appointment", (req,res)=> {
   res.render("appointment");
});  


 //adminlogin page

 app.post("/adminlogin",async function(req,res){ 
  
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

app.post("/studentlogin",async function(req,res){ 
  
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

app.post("/doctorlogin",async function(req,res){ 
  
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
 
app.listen(port,() => {
    console.log(`server is running at port no ${port}`);
}) 
//run npm run der in terminal....
