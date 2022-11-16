import mongoose from 'mongoose'
const UserSchema  = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    avatar:String
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Dobbyuser', UserSchema);