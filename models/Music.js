import mongoose from "mongoose";

const MusicSchema = new mongoose.Schema({
    songName:{
        type:String,
        required:true,
    },
    artist:{
        type:String,
        required:true,
    },
    textSong:String,
    viewSong:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    song:{
        type:String,
        required:true,
    },
    imgSong:{
        type:String,
        required:true,
    },
    favorite:{
        type:Boolean,
        required:true
    },
    duration:{
        type:String,
        required:true,
    }

},
    {
        timestamps:true,
    })


export default mongoose.model("Music",MusicSchema)