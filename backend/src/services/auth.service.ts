import VerificationCodeType from "../constants/verificationCodeType";
import UserModel from "../models/user.model"
import VerificationCodeModel from "../models/verificationCode.model";

export type CreateAccountParams = {
    email:string,
    password:string,
    userAgent?:string,
}

export const createAccount =async (data:CreateAccountParams)=>{
    //verify user not exist
    //hash pass
    const existingUser = await UserModel.exists({
        email: data.email,
    });
    if(existingUser){
        throw new Error("User already exist");
    }
    
    //create user
    const user = await UserModel.create({
        email:data.email,
        password:data.password
    });
    //create verification code
    const verificationCode = await VerificationCodeModel.create({
        userId:user._id,
        type: VerificationCodeType.EmailVerification,
        expiresAt: oneYearFromNow(),
    });

    //send v.code
    //create session
    //sign JWT & refresh token
    //return user & token
}