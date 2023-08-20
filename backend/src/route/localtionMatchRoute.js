const express = require('express');
const geolib = require('geolib');
const router = express.Router();
const Location = require('../models/locationmodel'); 

router.post("/match-locations", async (req, res) => {
  const userLocation = req.body.userLocation; 
  const maxDistance = 10; 

  try {
    const matchingLocations = await Location.find({
      $where: function () {
        return calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          this.latitude,
          this.longitude
        ) <= maxDistance;
      },
    });

    res.json({ matchingLocations });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});


module.exports = router;
