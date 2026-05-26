
//external modules
const express=require('express');

//core modules
const path=require('path');

//local modules
const userRouter=require("./routes/userRouter");
const {hostRouter}=require("./routes/hostRouter");
const rootDir=require("./utils/pathUtil")

const app=express();
app.set('view engine','ejs');
app.set('views','views');

app.use((req,res,next)=>
  {
    express.static(path.join(rootDir,"public"))
    next();
  })
  ;


app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
})

app.use(userRouter);

app.use("/host",hostRouter);

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(rootDir,"views","404.html"))
})



const PORT=3000;
app.listen(PORT,()=>{
  console.log(`The server is hosted on http://localhost:${PORT}/`);
})

