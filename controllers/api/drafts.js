const Draft = require('../../models/draft')

module.exports = {
    index,
    create,
    show,
    addPick
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
    return res.json(newDraft)
}

async function show(req, res) {
    try {
        const draft = await Draft.findById(req.params.draftId)
        if (draft && draft.participants.equals(req.user._id)) {
            res.json(draft)
        } else {
            throw new Error('Cannot access draft page.')
        }
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}

async function addPick(req, res) {
    try {
        const draft = await Draft.findById(req.params.draftId)
        if (draft && draft.participants.equals(req.user._id)) {
            if (draft.draftPicks.findIndex(draftPick => draftPick.playerId === req.body.playerId) === -1) {
                draft.draftPicks.push(req.body)
                res.json(await draft.save())
            }
        } else {
            throw new Error('Cannot add pick.')
        }
    } catch(err) {
        console.log(err)
        res.status(400).json(err)
    }
}
