const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../clubs.json');

function readClubs() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

router.get('/', (req, res) => {
  const data = readClubs();
  res.json(data.clubs);
});

router.get('/:id', (req, res) => {
  const data = readClubs();
  const club = data.clubs[req.params.id];

  if (club) {
    res.json(club);
  } else {
    res.status(404).json({ error: "Club not found" });
  }
});

router.get('/:id/hours', (req, res) => {
  const data = readClubs();
  const { id } = req.params;

  const club = data.clubs[id];
  
  if (club) {
    res.json({ clubName: club.name, totalHours: club.serviceHours });
  } else {
    res.status(404).json({ error: "Club not found" });
  }
});

module.exports = router;
