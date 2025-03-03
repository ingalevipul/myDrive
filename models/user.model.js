const mongoose=require('mongoose')
const userModel=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
        minlength:[3,'username must be atleast 3 char long']
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
       
    }
    ,password:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
       
    }
})
const user=mongoose.model('user',userModel)
module.exports=user