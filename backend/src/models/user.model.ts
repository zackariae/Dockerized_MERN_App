import  mongo from "mongoose";
import bcrypt from 'bcrypt';
import { hashValue, compareValue } from "../utils/bcrypt";
export interface UserDocument extends mongo.Document{
    email:string,
    password:string,
    verified:boolean,
    createdAt:Date,
    updatedAt:Date,
    comparePassword(val: string):Promise<boolean>;
}

const userSchema = new mongo.Schema<UserDocument>(
    {
        email:{type:String, unique:true, required:true},
        password:{type:String, required:true},
        verified:{type:Boolean, required: true, default:false},
    },
    {
        timestamps:true
    }
);

userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await hashValue(this.password);
    next();
});

userSchema.methods.comparePassword = async function (value:string){
    return compareValue(value, this.password);
}

const UserModel = mongo.model<UserDocument>("User", userSchema)
export default UserModel;
