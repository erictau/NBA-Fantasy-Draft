const express = require('express')
const router = express.Router()
const draftsCtrl = require('../../controllers/api/drafts')
const ensureLoggedIn = require('../../config/ensureLoggedIn')

router.get('/', ensureLoggedIn, draftsCtrl.index)
router.post('/', ensureLoggedIn, draftsCtrl.create)
router.get(`/:draftId`, ensureLoggedIn, draftsCtrl.show)
router.post(`/:draftId/select-player`, ensureLoggedIn, draftsCtrl.addPick)

module.exports = router