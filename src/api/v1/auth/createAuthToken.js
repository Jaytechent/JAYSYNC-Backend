import "dotenv/config";
import jwt from "jsonwebtoken";

const createAuthToken = async (res, req, next) => {
    try {
        const user = req.body;
        console.log(user);
        const token = jwt.sign({ id: user._id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "1h",
        });
   
        res.send({token});

    } catch (err) {
        
        console.log(err)
    }
};

export default createAuthToken;
