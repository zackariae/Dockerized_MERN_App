import  mongo  from "mongoose";
import VerificationCodeType from "../constants/verificationCodeType";


export interface VerificationCodeDocument extends mongo.Document  {
    userId: mongo.Types.ObjectId;
    type:VerificationCodeType;
    expiredAt:Date;
    createdAt:Date;
}

const verificationCodeSchema = new mongo.Schema<VerificationCodeDocument>({
    userId:{type:mongo.Schema.Types.ObjectId, ref:'User', required:true, index:true},
    type:{type:String, required:true},
    createdAt:{type:Date, required:true, default:Date.now},
    expiredAt:{type:Date,required:true}
});

const VerificationCodeModel = mongo.model('VerificationCode', verificationCodeSchema,"verification_codes");
export default VerificationCodeModel;