import connectToDb from "../../middleware/connectToDb";
import Image from '../../models/Image'
connectToDb();
import jwt from "jsonwebtoken";
const JWTSECRET = "HELLO"
const fetchImages = async (req, res) => {
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let {authtoken } = req.body;
        if(!authtoken){
            return res.json({success:false, msg:"Token not provided, please login to add this item."})
        }
        let {email} = jwt.verify(authtoken, JWTSECRET);
        if(!email){
            return res.json({success:false, msg:"User not authenticated"})
        }
        let image =await Image.find({user:email});
        if (image.length<=0) {
            return res.json({ success: false, msg: 'You have not uploaded any image yet'})
        }else{
            return res.json({success:true, msg:"Images loaded", image})
        }
    } catch (error) {
        return res.json({success:false, msg:error.msg})
    }
}

export default fetchImages;