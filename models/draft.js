const mongoose = require('mongoose')
const Schema = mongoose.Schema

const chatSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: String
}, {
    timestamps: true
})

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
    participants: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }],
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
    chat: [chatSchema]
},{
    timestamps: true,
    toJSON: {virtuals: true}
})


module.exports = mongoose.model('Draft', draftSchema)