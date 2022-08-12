const mongoose = require('mongoose')
const Schema = mongoose.Schema

const scoringSchema = new Schema({
    name: String,
    pts: Number,
    ast: Number,
    reb: Number,
    stl: Number,
    blk: Number,
    turnover: Number,
    pf: Number,
})

const draftPickSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    playerId: Number,
    first_name: String,
    last_name: String,
    position: String,
    team: String,
    pts: Number,
    ast: Number,
    reb: Number,
    stl: Number,
    blk: Number,
    turnover: Number,
    pf: Number,
    projectedScore: Number
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
        }
    },
    draftPicks: [draftPickSchema],
    numPlayersPerUser: Number,
},{
    timestamps: true,
    toJSON: {virtuals: true}
})


module.exports = mongoose.model('Draft', draftSchema)