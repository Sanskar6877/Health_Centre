

var express = require("express"); 
var router = express.Router(); 
const app=express();  
const path= require("path");
// var con = require('../connection');  
var createError = require('http-errors');


const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

 app.use("/assets",express.static("assets")); 
 app.set('views', path.join(__dirname, 'views'));
 app.set("view engine" , "ejs");
 app.use(express.static(__dirname + '/views'));

const { render } = require('ejs');

require("../routes/db/conn");

// const port = process.env.PORT || 5000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../views");
app.use(express.static(static_path));


var loginadmin=require("./loginadmin")
var loginstudent=require("./loginstudent")
var logindoctor=require("./logindoctor");
var doctordetails=require("./doctordetails");
var collection=require("./appointment");
var visitors=require("./visitors");
var note=require("./note");




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
router.get("/admindashboard",async function(req,res) {
   var data1;
   var data2;
   var data3;
   var data4;
   try{
       //first query
       let user_data = await loginadmin.count({}).exec();
       data1 = user_data;

       //second query
       let content_data = await loginstudent.count({}).exec();
       data3 = content_data;
 
       let content1_data = await doctordetails.count({}).exec();
       data2 = content1_data;
       let user_data2 = await collection.count({}).exec();
       data4 = user_data2;

       res.render("admindashboard", {
                    data1,data2,data3,data4
                  });  
           
        
}
catch(err){
 return res.status(400).json({err})
}
});  
router.get("/doctordashboard",async function(req,res) {
   var data1;
   var data2;
   var data3;
   var data4;
   try{
       //first query
       let user_data = await loginadmin.count({}).exec();
       data1 = user_data;

       //second query
       let content_data = await loginstudent.count({}).exec();
       data3 = content_data; 
 
       let content1_data = await doctordetails.count({}).exec();
       data2 = content1_data;
       let user_data2 = await collection.count({}).exec();
       data4 = user_data2;

       res.render("doctordashboard", {
                    data1,data2,data3,data4
                  });  
           
        
}
catch(err){
 return res.status(400).json({err})
}
}); router.get("/studentdashboard",async function(req,res) {
   var data1;
   var data2;
   var data3;
   var data4;
   try{
       //first query
       let user_data = await loginadmin.count({}).exec();
       data1 = user_data;

       //second query
       let content_data = await loginstudent.count({}).exec();
       data3 = content_data;
 
       let content1_data = await doctordetails.count({}).exec();
       data2 = content1_data;
       let user_data2 = await collection.count({}).exec();
       data4 = user_data2;

       res.render("studentdashboard", {
                    data1,data2,data3,data4
                  });  
           
        
}
catch(err){
 return res.status(400).json({err})
}
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
         var data1;
         var data2;
         var data3;
         var data4;
         try{
             //first query
             let user_data = await loginadmin.count({}).exec();
             data1 = user_data;
      
             //second query
             let content_data = await loginstudent.count({}).exec();
             data3 = content_data;
       
             let content1_data = await doctordetails.count({}).exec();
             data2 = content1_data;
             let user_data2 = await collection.count({}).exec();
             data4 = user_data2;
      
             res.render("admindashboard", {
                          data1,data2,data3,data4
                        });  
                 
              
   }
   catch(err){
       return res.status(400).json({err})
   }
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
         var data1;
         var data2;
         var data3;
         var data4;
         try{
             //first query
             let user_data = await loginadmin.count({}).exec();
             data1 = user_data;
      
             //second query
             let content_data = await loginstudent.count({}).exec();
             data3 = content_data;
       
             let content1_data = await doctordetails.count({}).exec();
             data2 = content1_data;
             let user_data2 = await collection.count({}).exec();
             data4 = user_data2;
      
             res.render("studentdashboard", {
                          data1,data2,data3,data4
                        }); 
                       
                    
         }
         catch(err){
             return res.status(400).json({err})
         }
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
         var data1;
         var data2;
         var data3;
         var data4;
         try{
             //first query
             let user_data = await loginadmin.count({}).exec();
             data1 = user_data;
      
             //second query
             let content_data = await loginstudent.count({}).exec();
             data3 = content_data;
       
             let content1_data = await doctordetails.count({}).exec();
             data2 = content1_data;
             let user_data2 = await collection.count({}).exec();
             data4 = user_data2;
      
             res.render("doctordashboard", {
                          data1,data2,data3,data4
                        }); 
                       
                    
         }
         catch(err){
             return res.status(400).json({err})
         }
      }else{
         res.render("invalid3")
      } }else{
         res.render("invalid3")
      }
   }catch{
      res.send("error")
   }
}) 


// router.get("/doctors",function(req,res,next) {
//    res.render("appointment");
// });  

//doctordetails
router.get('/doctors', (req, res)=> {
      
   doctordetails.find((err, data) => {
       if (!err) {
           res.render("list1", {
              sampleData:data
           });
       } else {
           console.log('Failed to retrieve the Course List: ');
       }
   });   
});
   
   router.get('/timingsadmin', (req, res)=> {
      
      doctordetails.find((err, data) => {
         if (!err) {
          note.find((err, data1) => {
             if (!err) {
                 res.render("list2admin", {
                    sampleData:data,sampleData1:data1
                 });
             } else {
                 console.log('Failed to retrieve the Course List: ');
             }
         });  
            
         } else {
             console.log('Failed to retrieve the Course List: ');
         }
     });  
   });
   router.get('/timings', (req, res)=> {
      
      doctordetails.find((err, data) => {
         if (!err) {
          note.find((err, data1) => {
             if (!err) {
                 res.render("list2", {
                    sampleData:data,sampleData1:data1
                 });
             } else {
                 console.log('Failed to retrieve the Course List: ');
             }
         });  
            
         } else {
             console.log('Failed to retrieve the Course List: ');
         }
     });   
    });
   router.get('/visitors', (req, res)=> {
      
      visitors.find((err, data) => {
           if (!err) {
               res.render("list3", {
                  sampleData:data
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       });  
    });
    router.get('/visitors1', (req, res)=> {
      
      visitors.find((err, data) => {
           if (!err) {
               res.render("list4", {
                  sampleData:data
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       });  
    });
    //appointmentsdisplay
    router.get('/aps', (req, res)=> {
      var sort = { date : 1 };
     collection.find((err, data) => {
           if (!err) {
               res.render("list5", {
                  sampleData:data
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       }).sort(sort);  
    });
    router.get('/deletevisitor/:id', (req, res, next)=> {
     
      visitors.findByIdAndDelete({_id: req.params.id},(err, data) => { 
           
           if (!err) {
               res.redirect('/login1/visitors1');
           } else {
               console.log('Failed to delete: ');
               next(err);
           }
       });  
    });
    
    //delete patient
    router.get('/deletepatient/:id', (req, res, next)=> {
     
      collection.findByIdAndDelete({_id: req.params.id},(err, data) => { 
           
           if (!err) {
               res.redirect('/login1/aps');
           } else {
               console.log('Failed to delete: ');
               next(err);
           }
       });  
    });
    


// router.get('/admincount', (req, res)=> {
    
   
//  loginadmin.count((err, data) => {
//       if (!err) { 
//          res.render("list2", {
//           data
//          }); 
        
//       } else {
//           console.log('Failed to retrieve the count: ');
//       }
//   });  
  
   

// });  
router.get('/admincount', async function(req, res) {
   var data1;
   var data2;
   var data3;
   try{
       //first query
       let user_data = await loginadmin.count({}).exec();
       data1 = user_data;

       //second query
       let content_data = await loginstudent.count({}).exec();
       data2 = content_data;
 
       let content1_data = await logindoctor.count({}).exec();
       data3 = content1_data;
       res.render("list2", {
                    data1,data2,data3
                  }); 
                 
              
   }
   catch(err){
       return res.status(400).json({err})
   } 
}); 
//appointment form

router.post("/appointments",async(req,res)=>{
   const data={
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      date:req.body.date+' time '+req.body.time,
      age:req.body.age,
      symptoms:req.body.symptoms,
      days:req.body.days

   }
   await collection.insertMany([data])
   res.render("success");
})
router.post("/note",async(req,res)=>{
   const data={
      note:req.body.note
    }
    await note.deleteMany({});
   await note.insertMany([data]);
   res.redirect('/login1/timingsadmin');
   
})
//doctoradd
router.post("/adddoctor",async(req,res)=>{
   const data={
      name:req.body.name,
     
      qualification:req.body.qualification,
      specialization:req.body.specialization,
      available:req.body.available,
     timings:req.body.timings1+" - "+req.body.timings2,
     type:req.body.type
      

   } 
   if(data.type=="visitor"){
   
   await visitors.insertMany([data])
   res.render("success1");}
   else{
      await doctordetails.insertMany([data])
      res.render("success1");
   }
})
 
 

module.exports=router;


 