import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../../../models/Users.js";

const authVerify = async (req, res, next) => {
    const token = req.body.token   || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'Unauthorized access first' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN); // Ensure you use the correct secret
        const email = decoded.email;

        const reqUser = await User.findOne({ email });
        if (!reqUser) {
            return res.status(401).send({ message: 'Unauthorized access second' });
        }

        req.user = reqUser; 
        next(); 
    } catch (err) {
        return res.status(401).send({ message: 'Unauthorized access third' });
    }
};

export default authVerify;










// import "dotenv/config";
// import jwt from "jsonwebtoken";
// import User from "../../../models/Users.js";


// const authVerify = async(req, res) => {
//     if (!req.body.token) {
//         return res.status(401).send({message: 'unAuthorized ss access'})
//     }
//     const token = req.body.token
//     try {
//         const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN)
//         if (decoded) {
//             const email = decoded.email
//             const query = {
//                 email:email
//             }
//             const reqUser = await User.findOne(query)
//             res.send(reqUser)
           
//         } else {
//             res.status(401).send({ message: 'Unauthorized access' });
//         }
//     } catch (err) {
//         return res.status(401).send({ message: 'Unauthorized access' });
//     }
// };

// export default authVerify
