import connectToDb from "../../middleware/connectToDb";
import User from '../../models/User'
import jwt from 'jsonwebtoken'
connectToDb();
const JWTSECRET = "HELLO"
const postLogin = async (req, res)=>{
    if(req.method!='POST'){
        return res.json({success:false, msg:"Method not allowed"})
    }
    let {email, password} = req.body;
    email = email.toLowerCase();
    let user = await User.findOne({'email':email});
    if(user){
        if(user.password==password){
            let authtoken = jwt.sign({ name: user.name, email: user.email,avatar: user.avatar, id: user._id }, JWTSECRET)
            return res.json({ success: true, msg: 'Login succesfull', authtoken: authtoken, userid:user._id, name:user.name, email:user.email, avatar:user.avatar })
        }
        return res.json({success:false, msg:'Password Incorrect'})
    }
    return res.json({success:false, msg:"User does not exist"});
}

export default postLogin;