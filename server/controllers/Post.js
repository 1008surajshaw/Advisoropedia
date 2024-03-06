const Post = require("../models/Post");

const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploder");

exports.createPost = async (req, res) => {
  try {
    const userId = req.user.id;
    if(!userId){
      return res.status(400).json({
        success:false,
        message:"you are not authorized to create post"
      })
    }
    let { title, description, tag:_tag } = req.body;
    const thumbnail = req.files.thumbnailImage;

   const tag = JSON.parse(_tag)
   

    if (!title || !description || tag.lenght ) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Mandatory",
      });
    }
    
    
    const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
    )

    console.log(thumbnailImage,"thumbnail image")
    const userDetails = await User.findById(userId);
      const newPost = await Post.create({
        title,
        description,
        tag,
        createdby:userDetails,
        thumbnail:thumbnailImage.secure_url,
        likes:0,
      })
      await User.findByIdAndUpdate(
        {
            _id:userDetails._id,
        },
        {
            $push :{
                post :newPost._id,
            },
        },
        {new:true}
      )

      res.status(200).json({
		success: true,
		data: newPost,
		message: "Post Created Successfully",
	  })
  } catch (error) {
    console.error(error)
	  res.status(500).json({
		success: false,
		message: "Failed to create Post",
		error: error.message,
	  })
  }
};


exports.getFullPostDetails = async (req,res) =>{
	try{
        
		const { postId } = req.body
		
		const postDetails = await Post.findOne({_id: postId})
		.populate({
			path:"createdby",
		})
		
		.exec()
        
		if (!postDetails) {
			return res.status(400).json({
			  success: false,
			  message: `Could not find post with id: ${postDetails}`,
			})
		  }
		
		return res.status(200).json({
			success:true,
      postDetails,
			
		})
	
	}
	catch(error){

		return res.status(500).json({
			success: false,
			message: error.message,
		  })
		}
}


exports.showAllPost = async (req,res) =>{
  try{
     const allpost  = await Post.find({});
     return res.status(200).json({
      success:true,
      message:"all post ",
      data:allpost,
     })
  }
  catch(error){
    return res.status(500).json({
      success:false,
      message:'come in cath block in all post',
     })
  }
}

exports.getUserPost = async (req,res) =>{
  try{
     const userId = req.user.id;
     if(!userId){
      return res.status(400).json({
        success:false,
        message:"you are not authorized"
      })
    }
     const userPosts = await Post.find({ createdby: userId }).exec();
     if (!userPosts || userPosts.length === 0) {
      return res.status(400).json({
        success: false,
        message: "You haven't posted yet",
      });
    }

    console.log(userPosts,"user post ")
    if (!userPosts ) {
      return res.status(400).json({
        success: false,
        message: "You haven't posted yet",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User posts retrieved successfully",
      posts: userPosts,
    });
  }
  catch(error){
    res.status(500).json({
      success: false,
      message: "Failed to search ",
      error: error.message,
      })
  }
}

