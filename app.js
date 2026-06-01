
//external modules
const express=require('express');
const mongoose=require('mongoose');
const session=require('express-session');
const mongoDbStore=require('connect-mongodb-session')(session);

//core modules
const path=require('path');

//local modules
const userRouter=require("./routes/storeRouter");
const {hostRouter}=require("./routes/hostRouter");
const authRouter=require("./routes/authRouter")
const rootDir=require("./utils/pathUtil")
const errorController=require("./controllers/error");

const {mongoConnect}=require("./utils/database");



const app=express();
app.set('view engine','ejs');
app.set('views','views');

const store=new mongoDbStore({
  uri:"mongodb+srv://root:root@airbnb.6j5lqiw.mongodb.net/airbnb",
  collection:'sessions'
})
store.on('error', (error) => {
    console.log('Session store error:', error);
})

app.use(express.static(path.join(rootDir,"public")));

app.use(session({

  secret:'secret1307',
  resave:false,
  saveUninitialized:true,
  store:store
}))



app.use((req, res, next) => {
  console.log('1.Hellox')
    const cookie = req.get('Cookie');
    req.isLoggedIn=req.session.isLoggedIn;
    next();
})

app.use((req,res,next)=>{
  console.log(req.url,req.method);
  next();
})


app.use(express.urlencoded({ extended: false }))

app.use(authRouter);

app.use('/host/',(req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect('/login')
  }
})

app.use(userRouter);

app.use("/host",hostRouter);

app.use(errorController.default);



const PORT=3000;

DB_PATH="mongodb+srv://root:root@airbnb.6j5lqiw.mongodb.net/airbnb"
mongoose.connect(DB_PATH).then(
  app.listen(PORT,()=>{
  console.log(`The server is hosted on http://localhost:${PORT}/`);
})
).catch(err=>console.log("error in connecting to mongoose"));
  


