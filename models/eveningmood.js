var mongoose = require ("mongoose");

//article schema
var Schema = mongoose.Schema;
var EveningSchema = new Schema({
    mood: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId, 
        ref: "Comment"
    }]
})

var Evening = mongoose.model("Evening", EveningSchema);
module.exports = Evening;
