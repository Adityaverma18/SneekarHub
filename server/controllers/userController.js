import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyEmail } from "../verify/emailVerify.js";
import { Session } from "../models/sessionModel.js";
import { sendEmailOtp, sendMobileOtp } from "../verify/otpVerify.js";
import { sendPhoneOtp } from "../verify/phoneverify.js";

// ===================== REGISTER =====================
export const registerUser = async (req, res) => {
  try {
    const { firstName, middleName, lastName, email, mobileNumber, password } =
      req.body;

    // Validate required fields
    if (!firstName || !lastName) {
        return res.status(400).json({ success: false, message: "Name is required" });
    }

    if (!email && !mobileNumber) {
        return res
            .status(400)
            .json({ success: false, message: "Email or mobile number is required" });
    }

    // Check if user already exists
    let existingUser;

    if (email && mobileNumber) {
      existingUser = await User.findOne({
        $or: [{ email }, { mobileNumber }],
      });
    } else if (email) {
      existingUser = await User.findOne({ email });
    } else if (mobileNumber) {
      existingUser = await User.findOne({ mobileNumber });
    }

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      firstName,
      middleName,
      lastName,
      email: email || null,
      mobileNumber: mobileNumber || null,
      password: hashedPassword
    });

     // Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    

    if (email)
      verifyEmail(token, newUser);

    if(mobileNumber)
    {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins expiry

      newUser.mobileOtp = otp;
      newUser.mobileOtpExpiry = otpExpiry;

      // 🔥 send SMS OTP asynchronously
      await sendPhoneOtp(otp, mobileNumber);
    }

    newUser.token = token

    const user = await newUser.save();

    return res.status(201).json({
      success: true,
      message:
        email
          ? "Verification email sent successfully."
          : "Mobile OTP sent successfully.",
      token,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        mobileNumber: user.mobileNumber,
      },
    });
  } catch (error) {
    console.error("Error at registration of user", error);
    res
      .status(500)
      .json({ success: false, message: "Server error: " + error.message });
  }
};

// ===================== LOGIN =====================
export const loginUser = async (req, res) => {
  try {
    const { email, mobileNumber, password } = req.body;

    if ((!email && !mobileNumber) || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email/Mobile and password required" });
    }

    // Find user by email or mobile
    const user = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    if(!user.isVerified)
    {
      return res.status(400).json({
        success: false,
        message : "Verify your account then login"
      })
    }

    // Generate token
    const accesstoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    const refreshtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    user.isLoggedIn = true
    await user.save()

    const existingSession = await Session.findOne({userId: user._id})
    if(existingSession)
    {
      await Session.deleteOne({userId: user._id})
    }

    await Session.create({userId: user._id})

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: `Welcome, ${user.firstName} ${user.lastName}`,
        email: user.email,
        accesstoken,
        refreshtoken
      },
    });
  } catch (error) {
    console.error("Error at Login user",error);
    res
      .status(500)
      .json({ 
        success: false, 
        message: error.message
      });
  }
};

//================Verify email=====================
export const verify =  async(req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
      res.status(400).json({
        success:false,
        message : "Authoriation token is missing or Invalid"
      })
    }

    const token =authHeader.split(" ")[1] 
    let decoded

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      if(error.name === "TokenExpiredError")
      {
        return res.status(400).json({
          success: false,
          message : "The registration token is expired"
        })
      }

      return res.status(400).json({
          success: false,
          message : "Token verification failed"
        })
    }
    const user = await User.findById(decoded.id)
    if(!user)
    {
      return res.status(400).json({
      success: false,
      message : "User not found"
    })
    }

    user.token = null
    user.isVerified = true

    await user.save()
    return res.status(200).json({
      success: true,
      message : "Email verified successfully"
    })

  } catch (error) {
    console.log("Error at Verify the link", error);
    res.status(500).json({
      status:false,
      message:error.message
    })
  }
}

//=============Re-Verify==========================
export const reverify = async(req,res) => {
  try {
    const {email} = req.body
    const user = await User.findOne({email})

    if(!user)
    {
      return res.status(400).json({
        success : false,
        message : "User not Found"
      })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    verifyEmail(token, user);

    user.token = token
    await user.save()

    return res.status(200).json({
      success:true,
      message : "Verification email sent successfully",
      token : user.token
    })

  } catch (error) {
    console.log("Error at reverify the email",error);
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}


//===================Logout========================
export const logout = async(req, res) => {
  try {
    const userId = req.id
    await Session.deleteMany({userId:userId})
    await User.findByIdAndUpdate(userId, {isLoggedIn:false})

    return res.status(200).json(
      {
        success: true,
        message: "User successfully logout"
      }
    )
  } catch (error) {
    console.log("Error at Forgot Password", error);
    return res.status(500).json({
      success : false,
      message : error.message
    })
  }
}

//==================Forgot Password================
export const forgotPassword = async (req, res) => {
  try {
    const { email, mobileNumber } = req.body;

    if (!email && !mobileNumber) {
      return res.status(400).json({
        success: false,
        message: "Please provide either an email or mobile number",
      });
    }

    // 🔍 Find user by email or mobile number
    const user = await User.findOne({
      $or: [{ email }, { mobileNumber }],
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔢 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    // ✉️ If email provided, store emailOtp; else if mobile, store mobileOtp
    if (email && user.email === email) {
      user.emailOtp = otp;
      user.emailOtpExpiry = otpExpiry;

      await user.save();

      await sendEmailOtp( email, otp);

      return res.status(200).json({
        success: true,
        message: "OTP sent to your email successfully",
      });
    } 
    else if (mobileNumber && user.mobileNumber === mobileNumber) {
      user.mobileOtp = otp;
      user.mobileOtpExpiry = otpExpiry;

      await user.save();

      await sendMobileOtp(otp, mobileNumber);

      return res.status(200).json({
        success: true,
        message: "OTP sent to your mobile number successfully",
      });
    } 
    else {
      return res.status(400).json({
        success: false,
        message: "Provided contact does not match our records",
      });
    }

  } catch (error) {
    console.log("Error at forgot Password")
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//==================Verify Otp======================
export const verifyEmailOtp = async (req, res) => {
  try {
    const {otp} = req.body;
    const email = req.params.email

    if(!otp)
    {
      return res.status(400).json(
        {
          success:false,
          message :  "OTP id required"
        }
      )
    }

    const user = await User.findOne({email})
    if(!user)
    {
      return res.status(400).json({
        success:false,
        message: "User is not found"
      })
    }

    if(!user.emailOtp || !user.emailOtpExpiry)
    {
      return res.status(400).json({
        success: false,
        message: "Otp is not generated or already verified"
      })
    }

    if(user.emailOtpExpiry < new Date())
    {
      return res.status(400).json({
        success:false,
        message: "Otp is expired"
      })
    }

    if(user.emailOtp !== otp)
    {
      return res.status(400).json({
        success: false,
        message: "Otp is invalid"
      })
    }

    user.emailOtp = null
    user.emailOtpExpiry = null
    await user.save()

    return res.status(201).json({
      success: true,
      message: "Otp verified successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//=================Change password==================
export const changePassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both new password and confirm password are required",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    return res.status(201).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("Error at changePassword", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//===================All user access=================
export const allUser = async(_, res) => {
  try {
    const users = await User.find()
    return res.status(201).json({
      success: true,
      users
    }) 
  } catch (error) {
    console.log("Error at All user access", error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

//=================Get User by Id=====================
export const getUserById = async(req, res) => {
  try {
    const {userId} = req.params
    const user = await User.findById(userId).select("-password -token -isVerified -isLoggedIn -mobileOtp -emailOtp -mobileOtpExpiry -emailOtpExpiry")

    if(!user)
    {
      return res.status(404).json({
        success:false,
        message: "User not found"
      })
    }

    res.status(200).json({
      success:true,
      user
    })

  } catch (error) {
    console.log("Error at get user by Id", error);
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
