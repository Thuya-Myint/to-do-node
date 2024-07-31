const mongoose=require("mongoose");
const Todo=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true,
    }
);
const InProgress=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true,
    }
)
const Completed=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true,
    }    
)
const todo=mongoose.model("Todo",Todo);
const Inprogress=mongoose.model("progress",InProgress);
const Complete=mongoose.model("complete", Completed);
module.exports={todo, Inprogress, Complete};