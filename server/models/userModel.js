import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : { type: String, required: true},
    middleName : {type: String, required: false},
    lastName : {type: String, required: true},
    profilePic : {type: String, default : ""}, //Cloudary image url
    profilePicPublicId : {type: String, default: ""},
    email: {  type: String,
  unique: true,
  sparse: true,
  default: null },
    mobileNumber: { type: String,
  unique: true,
  sparse: true,
  default: null},
    password : {type: String, required: true},
    role : 
    {
        type: String,
        enum : ["user","admin"],
        default : "user",
    },
    token: { type: String, default: null },
    isVerified : {type: Boolean, default:false},
    isLoggedIn : {type: Boolean, default: false},
    mobileOtp : {type : String, default : null},
    emailOtp : {type: String, default : null},
    mobileOtpExpiry : {type: Date, default: null},
    emailOtpExpiry : {type : Date, default : null},
    address : {type : String}, 
    city : {type : String},
    zipCode : {type : String},
    state : {type : String},
    country : {type : String}
}, {timestamps : true})

export const User = mongoose.model("User", userSchema)