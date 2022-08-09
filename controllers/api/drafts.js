const Draft = require('../../models/draft')

module.exports = {
    index,
    create,
}

async function index(req, res) {
    const drafts = await Draft.find({participants: req.user._id})
    res.json(drafts)
}

async function create(req, res) {
    const scoringSystem = {...req.body}
    scoringSystem.name = scoringSystem.scoringSystemName
    delete scoringSystem.scoringSystemName
    const draftForm = { 
        name: req.body.name,
        participants: req.user._id,
        scoringSystem
    }
    let newDraft = await Draft.create(draftForm)
    console.log(newDraft)
    return res.json(newDraft)
}