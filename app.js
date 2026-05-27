
//external modules
const express=require('express');

//core modules
const path=require('path');

//local modules
const userRouter=require("./routes/storeRouter");
const {hostRouter}=require("./routes/hostRouter");
const rootDir=require("./utils/pathUtil")
const errorController=require("./controllers/error");

const app=express();
app.set('view engine','ejs');
app.set('views','views');

app.use(express.static(path.join(rootDir,"public")))

  ;

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
})

app.use(express.urlencoded({ extended: false }))

app.use(userRouter);

app.use("/host",hostRouter);

app.use(errorController.default);



const PORT=3000;
app.listen(PORT,()=>{
  console.log(`The server is hosted on http://localhost:${PORT}/`);
})

