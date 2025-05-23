const express=require('express');
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync");
const Listing=require("../models/listing");
const Review=require("../models/review");
const {validateReview,isLoggedIn,isReviewAuthor,hasBookedListing}=require("../middleware");

const reviewController=require("../controllers/reviews");


router.post("/",isLoggedIn,hasBookedListing,validateReview, wrapAsync(reviewController.createReview));
 
 
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports=router;