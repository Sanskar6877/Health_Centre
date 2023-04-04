

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
router.get("/covid", function(req,res,next){
   res.render("covid");
});  
router.get("/status/:id", async function(req,res){
     var data5= req.params.id;
   res.render("status",{data5});
});  
router.get("/statusd/:id", async function(req,res){
   var data5= req.params.id;
 res.render("statusd",{data5});
});  
router.get("/admindashboards/:id",async function(req,res) {
   
   var data1;
   var data2;
   var data3;
   var data4;
   var data5=req.params.id;
   
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
                    data1,data2,data3,data4,data5
                  });  
           
        
}
catch(err){
 return res.status(400).json({err})
}
});  
router.get("/doctordashboards/:id",async function(req,res) {
   

 
try{ 
   // console.log(req.body);  
   const check=await logindoctor.findOne({
    name:req.params.id
   }) 

   
   if(check){
      
   
      var data1;
      var data2;
      var data3;
      var data4;
      var data5=check.name;
      var name1=check._id;
      
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
                       data1,data2,data3,data4,data5,name1
                     });  
              
           
}
catch(err){
    return res.status(400).json({err})
}
    }else{
      res.render("invalid1")
   }
}catch{
   res.send("error")
}
})  ;

router.get("/studentdashboards/:id",async function(req,res) {
   

 
   try{ 
      // console.log(req.body);  
      const check=await loginstudent.findOne({
       name:req.params.id
      }) 
   
      
      if(check){
         
      
         var data1;
         var data2;
         var data3;
         var data4;
         var data5=check.name;
         var name1=check._id;
         
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
                          data1,data2,data3,data4,data5,name1
                        });  
                 
              
   }
   catch(err){
       return res.status(400).json({err})
   }
       }else{
         res.render("invalid1")
      }
   }catch{
      res.send("error")
   }
   })  ; 

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
         var data5=check.name;
         
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
                          data1,data2,data3,data4,data5
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
         var data5=check.name;
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
                          data1,data2,data3,data4,data5
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
         var data5=check.name;
         var name1=check._id;
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
                          data1,data2,data3,data4,data5,name1
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
router.get('/doctorsa/:id', (req, res)=> {
      var data5=req.params.id;
   doctordetails.find((err, data) => {
       if (!err) {
           res.render("list1a", {
              sampleData:data,data5
           });
       } else {
           console.log('Failed to retrieve the Course List: ');
       }
   });   
});
router.get('/doctors/:id', (req, res)=> {
   var data5=req.params.id;
   doctordetails.find((err, data) => {
       if (!err) {
           res.render("list1", {
              sampleData:data,data5
           });
       } else {
           console.log('Failed to retrieve the Course List: ');
       }
   });   
});
router.get('/doctorsd/:id', (req, res)=> {
   var data5=req.params.id;
   doctordetails.find((err, data) => {
       if (!err) {
           res.render("list1d", {
              sampleData:data,data5
           });
       } else {
           console.log('Failed to retrieve the Course List: ');
       }
   });   
});
   
   router.get('/timingsadmin/:id', (req, res)=> {
      var data5=req.params.id;
      doctordetails.find((err, data) => {
         if (!err) {
          note.find((err, data1) => {
             if (!err) {
                 res.render("list2admin", {
                    sampleData:data,sampleData1:data1,data5
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
   router.get('/timings/:id', (req, res)=> {
      var data5=req.params.id;
      doctordetails.find((err, data) => {
         if (!err) {
          note.find((err, data1) => {
             if (!err) {
                 res.render("list2", {
                    sampleData:data,sampleData1:data1,data5
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
    router.get('/timingsd/:id', (req, res)=> {
      var data5=req.params.id;
      doctordetails.find((err, data) => {
         if (!err) {
          note.find((err, data1) => {
             if (!err) {
                 res.render("list2d", {
                    sampleData:data,sampleData1:data1,data5
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
   router.get('/visitors/:id', (req, res)=> {
      var data5=req.params.id;
      visitors.find((err, data) => {
           if (!err) {
               res.render("list3", {
                  sampleData:data,data5
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       });  
    });
    router.get('/visitorsd/:id', (req, res)=> {
      var data5=req.params.id;
      visitors.find((err, data) => {
           if (!err) {
               res.render("list3d", {
                  sampleData:data,data5
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       });  
    });
    router.get('/visitors1/:id', (req, res)=> {
      var data5=req.params.id;
      visitors.find((err, data) => {
           if (!err) {
               res.render("list4", {
                  sampleData:data,data5
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       });  
    });
    //appointmentsdisplay
    router.get('/aps/:id', (req, res)=> {
      var data5=req.params.id;
      var sort = { date : 1 };
     collection.find((err, data) => {
           if (!err) {
               res.render("list5", {
                  sampleData:data,data5
               });
           } else {
               console.log('Failed to retrieve the Course List: ');
           }
       }).sort(sort);  
    });
    router.get('/deletevisitor/:id/:id1', (req, res, next)=> {
     var data5=req.params.id1;
      visitors.findByIdAndDelete({_id: req.params.id},(err, data) => { 
           
           if (!err) { 
               res.render("visitordelete",{data5});
           } else {
               console.log('Failed to delete: ');
               next(err);
           }
       });  
    });
    
    //delete patient
    router.get('/deletepatient/:id/:id1', (req, res, next)=> {
     var data5=req.params.id1;
      collection.findByIdAndDelete({_id: req.params.id},(err, data) => { 
           
           if (!err) {
               res.render("deletesuccess",{data5});
           } else {
               console.log('Failed to delete: ');
               next(err);
           }
       });  
    });
    //accept patient
    router.post('/accepts/:id/:id1',async (req, res, next)=> {
      var data5=req.params.id1;
      collection.findByIdAndUpdate({_id: req.params.id},req.body,(err, data) => { 
           
         if (!err) {
             res.render("acceptsuccess",{data5});
         } else {
             console.log('Failed to update: ');
             next(err);
         }
     });  
            
    });
  

    router.get('/acceptpage/:id/:id1',async(req, res, next)=> {
                var name1=req.params.id;
                var data5=req.params.id1;
             res.render("accept",{name1,data5});
         
            
    });
   
    router.post("/adddoctor/:id",async(req,res)=>{
      var name1=req.params.id;
     
      const data={
         name:req.body.name,
         email:req.body.email,
         qualification:req.body.qualification,
         specialization:req.body.specialization,
         available:req.body.available,
        timings:req.body.timings1+" - "+req.body.timings2,
         type:req.body.type
   
      } 
      if( req.body.type=="visitor"){
      
      await visitors.insertMany([data])
      res.render("success1",{name1});
    
   
   }
      else{
         await doctordetails.insertMany([data])
         res.render("success1",{name1});
      }
   })


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

router.post("/appointmentss/:id",async(req,res)=>{
   var name1=req.params.id;
   const data={
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      date:req.body.date+' time '+req.body.time,
      age:req.body.age,
      symptoms:req.body.symptoms,
      days:req.body.days,
      sheduledtime:"not yet sheduled",
      assigneddoctor:"Not Yet Assigned"
     
   } 
   await collection.insertMany([data])
   res.render("success",{name1});
})
router.post("/appointmentsd/:id",async(req,res)=>{
   var name1=req.params.id;
   const data={
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      date:req.body.date+' time '+req.body.time,
      age:req.body.age,
      symptoms:req.body.symptoms,
      days:req.body.days,
      sheduledtime:"not yet sheduled",
      assigneddoctor:"Not Yet Assigned"
      
   }
   await collection.insertMany([data])
   res.render("successd",{name1});
})
router.post("/appointmentsa/:id",async(req,res)=>{
   var name1=req.params.id;
   const data={
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      date:req.body.date+' time '+req.body.time,
      age:req.body.age,
      symptoms:req.body.symptoms,
      days:req.body.days,
      sheduledtime:"not yet sheduled",
      assigneddoctor:"Not Yet Assigned"
      
   }
   await collection.insertMany([data])
   res.render("successa",{name1});
})
//displaydoctorappointmenst
router.get('/displayappointments/:id', async(req, res, next)=> {
   var sort = { date : 1 };
   var name1=await logindoctor.findOne({_id: req.params.id});
    var name2=name1.name;
    
   collection.find({assigneddoctor:name2},(err, data) => { 
         
        if (!err) { 
            res.render("list6",{sampleData:data});
        } else {
            console.log('Failed to delete: ');
            next(err);
        }
    }).sort(sort);  
 });
router.post("/note",async(req,res)=>{
   const data={
      note:req.body.note
    }
    await note.deleteMany({});
   await note.insertMany([data]);
   res.redirect('/login1/timingsadmin');
   
})
//appointment details
router.post("/statuss/:id",async function(req,res){ 
    var name1=req.params.id;
   try{ 
       
      const check=await collection.findOne({
       email:req.body.email
      }) 
      
      if(check){
       
      if(check.phone===req.body.phone){
         var data1=check.name;
         var data2=check.email;
         var data3=check.phone;
         var data4=check.age;
         var data5=check.symptoms;
         var data6=check.sheduledtime;
         var data7=check.assigneddoctor;
         
       

         // try{
         //     //first query
         //     let user_data = await loginadmin.count({}).exec();
         //     data1 = user_data;
      
         //     //second query
         //     let content_data = await loginstudent.count({}).exec();
         //     data3 = content_data;
       
         //     let content1_data = await doctordetails.count({}).exec();
         //     data2 = content1_data;
         //     let user_data2 = await collection.count({}).exec();
         //     data4 = user_data2;
                
             res.render("display",{data1,data2,data3,data4,data5,data6,data7,name1}); 
                   
                    
         
        
      }else{
         res.render("invalid4",{name1})
      }
    }else{
      res.render("invalid4",{name1})
    }
     
   }
   catch{
      res.send("error")
   }
})  
router.post("/statussd/:id",async function(req,res){ 
   var name1=req.params.id;
  try{ 
      
     const check=await collection.findOne({
      email:req.body.email
     }) 
     
     if(check){
      
     if(check.phone===req.body.phone){
        var data1=check.name;
        var data2=check.email;
        var data3=check.phone;
        var data4=check.age;
        var data5=check.symptoms;
        var data6=check.sheduledtime;
        var data7=check.assigneddoctor;
        
      

        // try{
        //     //first query
        //     let user_data = await loginadmin.count({}).exec();
        //     data1 = user_data;
     
        //     //second query
        //     let content_data = await loginstudent.count({}).exec();
        //     data3 = content_data;
      
        //     let content1_data = await doctordetails.count({}).exec();
        //     data2 = content1_data;
        //     let user_data2 = await collection.count({}).exec();
        //     data4 = user_data2;
               
            res.render("displayd",{data1,data2,data3,data4,data5,data6,data7,name1}); 
                  
                   
        
       
     }else{
        res.render("invalid4d",{name1})
     }
   }else{
     res.render("invalid4d",{name1})
   }
    
  }
  catch{
     res.send("error")
  }
}) 
//doctoradd

 
 

module.exports=router;


 