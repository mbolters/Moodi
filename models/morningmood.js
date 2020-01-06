var mongoose = require ("mongoose");

//article schema
var Schema = mongoose.Schema;
var MorningSchema = new Schema({
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

var Morning = mongoose.model("Morning", MorningSchema);
module.exports = Morning;
