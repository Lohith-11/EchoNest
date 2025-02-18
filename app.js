const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Listing=require("./models/listing");
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const wrapAsync=require("./utils/wrapAsync");
const ExpressError=require("./utils/ExpressError");
const {listingSchema,reviewSchema}=require("./schema");
const Review=require("./models/review");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const MONGO_URL="mongodb://127.0.0.1:27017/echoNest";
async function main() {
     await mongoose.connect(MONGO_URL);
}

main().then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err,"");
})


app.get("/",(req,res)=>{
    res.send("I am root");
})

const validateListing=(req,res,next)=>{
    let {error}= listingSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}

const validateReview=(req,res,next)=>{
    let {error}= reviewSchema.validate(req.body);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",")
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
}


app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings= await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
}));

app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
});


app.get("/listings/:id",wrapAsync(async (req,res)=>{
    const {id}=req.params;
    const listing= await Listing.findById(id).populate("reviews");
    res.render("./listings/show.ejs",{listing});
}));

app.post("/listings",validateListing,wrapAsync(async (req,res,next)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}));

app.get("/listings/:id/edit",wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("./listings/edit.ejs",{listing});
}));

app.put("/listings/:id",validateListing,wrapAsync(async(req,res)=>{
    let {id}=req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing});
     res.redirect(`/listings/${id}`);
}));


app.delete("/listings/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));


app.post("/listings/:id/reviews",validateReview, wrapAsync(async(req,res)=>{
   let listing= await Listing.findById(req.params.id);
   let newReview=new Review(req.body.review);

   listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));


app.delete("/listings/:id/reviews/:reviewId",wrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listings/${id}`);
}))

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