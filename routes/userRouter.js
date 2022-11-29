const express = require('express');

const router = express.Router();

const register = require('../controllers/register_controller');
const login = require('../controllers/login_controller');

router.get("/", (req, res) => {
    res.send("reached user route");
  })

router.post("/register", register)
router.post('/login',login)

module.exports = router;