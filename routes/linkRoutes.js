const express = require('express');
const router = express.Router();
const { linkData } = require('../controllers/linkController');

router.get('/',linkData);

module.exports = router;