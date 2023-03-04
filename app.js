const express = require("express");
const app= express();
const path= require("path");
require("./db/conn");
const port = process.env.PORT || 3002;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
app.get("/", (req,res)=> {
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

app.listen(port,() => {
    console.log(`server is running at port no ${port}`);
}) 
//run npm run der in terminal....
