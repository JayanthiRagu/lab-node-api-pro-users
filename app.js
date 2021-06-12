const mongoose = require('mongoose')
const Schema=mongoose.Schema
const schemaName = new Schema({
        name: {type: String,required:true},
        email: {type: String,required:true},
        age: {type: Number},
        prograd_id: {type: Number},
        squad: {type: Number}
    },
    {collection: 'user'}
    )

    
module.exports = mongoose.model('sampleModel',schemaName)