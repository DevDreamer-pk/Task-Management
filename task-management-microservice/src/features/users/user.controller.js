import userManager from "./user.manager.js";
import  Jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export default class UserController {

    async registerUser(req, res) {
        // console.log(name , email , password , userType)
        const user = await new userManager().signUp(req.body);
        // console.log("signedUp : ",signedUp)
        if(!user.success) {
            return res.status(400).send(user);
        }
        return res.status(201).send(user);
    }

    async login(req, res) {
        const user = await new userManager().signIn(req.body);

        if(!user.success) {
            return res.status(404).send(user);
        }

        // create token
        const token = Jwt.sign({userID : user.userData._id, name: user.userData.name, email: user.userData.email}, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).send({ success: true, message: "User logged in successfully", token });
    }

}
