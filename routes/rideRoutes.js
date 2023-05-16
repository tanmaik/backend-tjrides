const express = require("express");
const router = express.Router();

const HttpError = require("../models/http-error");
const Ride = require("../models/ride");

router.get("/", async (req, res, next) => {
  let rides;
  try {
    rides = await Ride.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching rides failed, please try again later.",
      500
    );
    return next(error);
  }

  res.json({ rides: rides.map((ride) => ride.toObject({ getters: true })) });
});

router.post("/", async (req, res, next) => {
  const { driver, time, address, location, maxNumber } = req.body;

  const createdRide = new Ride({
    driver,
    time,
    address,
    location,
    maxNumber,
    riders: [],
  });

  try {
    await createdRide.save();
  } catch (err) {
    const error = new HttpError("Creating ride failed, please try again.", 500);
    console.log(err);
    return next(error);
  }

  res.status(201).json({ ride: createdRide.toObject({ getters: true }) });
});

// add rider to ride

router.patch("/:rid", async (req, res, next) => {
  const { rid } = req.params;
  const { rider } = req.body;

  let ride;
  try {
    ride = await Ride.findById(rid);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find ride.",
      500
    );
    return next(error);
  }

  ride.riders.push(rider);

  try {
    await ride.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not add rider.",
      500
    );
    return next(error);
  }

  res.status(200).json({ ride: ride.toObject({ getters: true }) });
});

module.exports = router;
