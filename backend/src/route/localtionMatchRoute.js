const express = require('express');
const geolib = require('geolib');
const router = express.Router();
const Location = require('../models/locationmodel'); 


router.get('/match-location', async (req, res) => {
  const { latitude, longitude } = req.query; 
 
  const allLocations = await Location.find();

 
  const matchingLocations = allLocations.filter(location => {
    const distance = geolib.getDistance(
      { latitude: parseFloat(latitude), longitude: parseFloat(longitude) },
      { latitude: location.latitude, longitude: location.longitude }
    );
    return distance <= 1000; 
  });

  res.send(matchingLocations);
});

module.exports = router;
