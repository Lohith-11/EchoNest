const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review=require("./review")

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
});

const listingSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        url:String,
        filename:String,
    },
    price: {
        type: Number,
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
        enum:["mountains","trending","rooms","cities","castles","pools","camping","farms","arctic","domes","boats"]
    },
    bookings: [bookingSchema],
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id : {$in:listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;