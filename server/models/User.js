const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        userName:{
            type: String,
			required: true,
			
        },
        email: {
			type: String,
			required: true,
			trim: true,
		},
        contactNumber:{
            type:Number,
            require:true,
        },
        
		password: {
			type: String,
			required: true,
		},
        token: {
			type: String,
		},
		resetPasswordExpires: {
			type: Date,
		},
		image: {
			type: String,
			required: true,
		},
        post :{
            type:mongoose.Schema.Types.ObjectId,
            require:true,
            ref:"Post"
        }
    },
    { timestamps: true }

)
module.exports = mongoose.model("User", userSchema);