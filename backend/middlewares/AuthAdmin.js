import jwt from 'jsonwebtoken';

//middleware for admin authentication using tokens

const authAdmin = async (req, res, next) =>{

    try {

        const {atoken} = req.headers;
        if (!atoken) {
            return res.json({success:false, message:"Not authorized"})
        }

        const decode_token = jwt.verify(atoken, process.env.JWT_SECRET);
        if(decode_token !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Not authorized"})
        }

        next();
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

export default authAdmin;

