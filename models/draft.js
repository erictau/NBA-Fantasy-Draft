const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoringSchema = new Schema({
    name: String,
    pts: Number,
    ast: Number,
    reb: Number,
    stl: Number,
    blk: Number,
    to: Number,
    pf: Number,
    fgmissed: Number,
})

const draftPickSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    pickNo: Number,
    playerId: Number,
    playerName: String
})

const draftSchema = new Schema({
    name: String,
    // Change this into an array of participants to allow multiple people to draft together. 
    participants: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    scoringSystem: {
        type: scoringSchema,
        default: {
            name: 'default',
            pts: 1,
            ast: 2,
            reb: 2,
            stl: 2.5,
            blk: 2.5,
            to: -1.5,
            pf: -1.5,
            fgmissed: -0.5
        }
    },
    draftPicks: [draftPickSchema],
    isComplete: { type: Boolean, default: false }
},{
    timestamps: true,
    toJSON: {virtuals: true}
})

// Virtuals. Calculate the draft score based on player stats and scoringSchema.
draftSchema.virtual('draftScore').get(function() {
    return 'Test'
})

module.exports = mongoose.model('Draft', draftSchema)