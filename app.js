if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const ExpressError=require("./utils/ExpressError");
const listingRouter=require("./routes/listing");
const reviewRouter =require("./routes/review");
const session=require("express-session");
const MongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require('passport-local');
const User=require("./models/user");
const userRouter=require("./routes/user");
const bookingRoutes = require("./routes/booking");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"public")));


const dbUrl = process.env.ATLASDB_URL;

async function main() {
     await mongoose.connect(dbUrl);
}

main().then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err,"");
})

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET
    },
    touchAfter:24*60*60,
});

store.on("error",()=>{
  console.log("Error in MongoStore",err);  
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expire: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.error=req.flash("error");
    res.locals.currUser=req.user;
    next();
})

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);
app.use("/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found!"));
})

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something Went Wrong!!"}=err;
    res.status(statusCode).render("error.ejs",{message});
})

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})