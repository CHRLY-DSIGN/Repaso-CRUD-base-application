const router = require("express").Router();
const Coaster = require('../models/Coaster.model')
const Park = require('../models/Park.model')


//GET ALL COASTERS
router.get("/", (req, res, next) => {

    Coaster.find()
      .populate("park_id")
      .then(allCoasters => res.render("coasters/coaster-index", { allCoasters }))
      .catch(err => console.log(err))
  
});

//CREATE NEW COASTER
router.get("/new", (req, res) => {

  Park
    .find()
    .then(parks => {
        console.log(parks);
        res.render("coasters/new-coaster", { parks })
    })
    
})

router.post("/new", (req, res) => {
    const { name, description, inversions, length, active, park_id } = req.body;
  
    Coaster.create({ name, description, inversions, length, active, park_id})
      .then(res.redirect("/coasters"))
      .catch(err => console.log(err))
  
})

//COASTER DETAILS
router.get("/:id", (req, res, next) => {

    const { id } = req.params

    Coaster.findById(id)
        .populate("park_id")
        .then(coaster => res.render("coasters/coaster-details", coaster))
        .catch(err => console.log(err))
});



//DELETE COASTER

router.get("/:id/delete", (req, res) => {

    const { id } = req.params
  
    Coaster.findById(id)
      .then(coaster => res.render("coasters/coaster-delete", coaster))
      .catch(err => console.log(err))
  })


router.post("/:id/delete", (req, res) => {
    
    const { id } = req.params
    
    Coaster.findByIdAndDelete(id)

      .then(res.redirect("/coasters"))
      .catch(err => console.log(err))
  
})


 //EDIT A COASTER
 router.get("/:id/edit", (req, res) => {

    const { id } = req.params

    const coaster = Coaster.findById(id).populate("park_id")
    const parks = Park.find()

  
    Promise.all([coaster, parks])
      .then(data => {
        const [coaster, parks] = data
        res.render("coasters/edit-coaster", {coaster, parks})
      })
      .catch(err => console.log(err))
  })

  router.post("/:id/edit", (req, res) => {

    const { name, description, inversions, length, park_id} = req.body;
    const { id } = req.params
  
    Coaster.findByIdAndUpdate(id, { name, description, inversions, length, park_id}, { new: true })
      .then(res.redirect("/coasters"))
      .catch(err => console.log(err))
  })


module.exports = router;