import bcrypt from 'bcrypt'
import userModel from './user.model.js';

export default class UserManager {

    async signUp({ name, email, password, userType }) {
        try {
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return { success: false, message: 'User already exists' };
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userModel.create({ name, email, password: hashedPassword, userType });
            return { success: true, user: newUser };
        } catch (error) {
            console.log('Manager error',error);
            throw error;
        }
    }

    async signIn({email, password}) {
        try {
            const user = await userModel.findOne({ email });
            if (!user) {
                return { success: false, message: 'User not found' };
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return { success: false, message: 'Incorrect password' };
            }
            return { success: true, userData: user };
        } catch (error) {
            console.log('Manager error',error);
            throw error;
        }
    }
}