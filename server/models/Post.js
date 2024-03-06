const mongoose = require("mongoose")

const postSchema =new mongoose.Schema({
    createdby:{
        type: mongoose.Schema.Types.ObjectId,
		ref: "User", 
    },
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    thumbnail :{
        type:String,
    },
    tag:{
        type: [String],
		required: true,
    },
    createdAt: {
		type:Date,
		default:Date.now,
	},
    likes:{
        type:Number,
    }
})
module.exports = mongoose.model("Post", postSchema);