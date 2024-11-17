import "dotenv/config";
import jwt from "jsonwebtoken";
import User from "../../models/Users.js";
import { bcHashCompare } from "../../utils/bcrypt.js";

const checkUserPass = async (user) => {
    const email = user.email;
    const plainPassword = user.password;
    try {
        const query = {
            email: email,
        };

        const reqUser = await User.findOne(query);

        if (!reqUser) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        const cursor = await bcHashCompare(plainPassword, reqUser.password);
        if (cursor) {
            
            const token = jwt.sign({ id: reqUser._id, email: reqUser.email }, process.env.ACCESS_TOKEN, {
                expiresIn: "1h",
            });
            // const token = jwt.sign({  email: reqUser.email }, process.env.ACCESS_TOKEN, {
            //     expiresIn: "1h",
            // });
            // // Include userId in the result
            const result = {
                user: {
                    id: reqUser._id, // Include userId
                    email: reqUser.email,
                    role: reqUser.role,
                },
                token,
            };
            return result;
        } else {
            const error = new Error("Password is Wrong");
            error.status = 401;
            throw error;
        }
    } catch (err) {
        throw new Error(err);
    }
};

export default checkUserPass;
