import mongoose from 'mongoose'
const ImageSchema  = new mongoose.Schema({
    name:String,
    user:String,
    url:String,
},{timestamps:true})

mongoose.models={};
export default mongoose.model('Image', ImageSchema);