const router = require("express").Router();
const Park = require('../models/Park.model')


//SHOW ALL PARKS
router.get("/", (req, res, next) => {

    Park.find()
      .then(allParks => res.render("parks/all-parks-list", { allParks }))
      .catch(err => console.log(err))
  
});

//CREATE NEW PARK
router.get("/new", (req, res) => {
    res.render("parks/new-park")
})

router.post("/new", (req, res) => {
    const { name, description } = req.body;
  
    Park.create({ name, description})
      .then(res.redirect("/parks"))
      .catch(err => console.log(err))
  
  })

module.exports = router;