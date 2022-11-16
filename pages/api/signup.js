import connectToDb from "../../middleware/connectToDb";
import User from '../../models/User'
import jwt from 'jsonwebtoken'
connectToDb();

const postSignup = async (req, res) => {
    const JWTSECRET = "HELLO"
    try {
        if (req.method != 'POST') {
            return res.json({ success: false, msg: "Method not allowed" })
        }
        let { name, email, password, avatar} = req.body;
        email = email.toLowerCase();
        if (!name || !email || !password || !avatar) {
            return res.json({ success: false, msg: "Please fill all the fields" })
        }
        let user =await User.findOne({'email':email});
        if(user){
            return res.json({success:false, msg:'User already exists'})
        }
        user = await User.create({
            name: name,
            email: email,
            password: password,
            avatar: avatar
        })
        if (user) {
            let authtoken = jwt.sign({ name: user.name, email: user.email, avatar: user.avatar, id: user._id }, JWTSECRET)
            return res.json({ success: true, msg: 'Signup succesfull', authtoken: authtoken, userid:user._id, name:user.name, email:user.email, avatar:user.avatar })
        }else{
            return res.json({success:false, msg:"Sign up failed 1"})
        }
        
    } catch (error) {
        return res.json({success:false, msg:"Sign up failed 2"})
    }
}

export default postSignup;