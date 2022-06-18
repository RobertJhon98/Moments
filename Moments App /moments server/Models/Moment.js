const mongoose = require('mongoose')

const moment = mongoose.Schema({
    title : {type : String, required:true},
    tags : Array,
    photoUrl : {type : String, required:true},
    user_id : {type :mongoose.Schema.Types.ObjectId }
}, {timestamps : true})


module.exports = mongoose.model('moments', moment)