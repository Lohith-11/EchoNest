const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");

router.post("/:id/book", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { startDate, endDate } = req.body;
    const listing = await Listing.findById(id);

    listing.bookings.push({
        user: req.user._id,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
    });

    await listing.save();
    req.flash("success", "Booking successful!");
    res.redirect(`/listings/${id}`);
});

router.get("/my-bookings", isLoggedIn, async (req, res) => {
    const listings = await Listing.find({ "bookings.user": req.user._id }).populate("bookings.user");
    res.render("bookings/myBookings.ejs", { listings });
});

module.exports = router;
