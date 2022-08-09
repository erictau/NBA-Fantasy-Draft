const express = require('express')
const router = express.Router()
const draftsCtrl = require('../../controllers/api/drafts')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, draftsCtrl.index)
router.post('/create', ensureLoggedIn, draftsCtrl.create)

module.exports = router