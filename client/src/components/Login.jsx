import React, { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

import { RxCross1 } from "react-icons/rx";
import { CiMail } from "react-icons/ci";
import { FaRegUser, FaApple, FaGoogle, FaFacebook } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { IoIosCall } from "react-icons/io";

export default function Login() {
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  // Mode states
  const [mode, setMode] = useState("Login"); // "Login" or "Signup"
  const [method, setMethod] = useState("Email"); // "Email" or "Mobile"

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Mobile OTP states
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifiedPhone, setVerifiedPhone] = useState(false);

  const [loading, setLoading] = useState(false);

  // 🔹 SEND MOBILE OTP
  const handleSendOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/resend-mobile-otp`,
        { mobileNumber }
      );

      if (data.success) {
        toast.success("OTP sent successfully!");
        setOtpSent(true);
      } else toast.error(data.message);
    } catch {
      toast.error("Failed to send OTP");
    }
  };

  // 🔹 VERIFY MOBILE OTP
  const handleVerifyOtp = async () => {
    if (!otp) return toast.error("Enter OTP");

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/v1/user/verify-mobile-otp`,
        { mobileNumber, otp }
      );

      if (data.success) {
        toast.success("Phone Verified!");
        setVerifiedPhone(true);
      } else toast.error(data.message);
    } catch {
      toast.error("Invalid OTP");
    }
  };

  // 🔹 SUBMIT HANDLER
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ================= LOGIN =================
      if (mode === "Login") {
        const payload =
          method === "Email"
            ? { email, password }
            : { mobileNumber, password };

        const { data } = await axios.post(
          `${backendUrl}/api/v1/user/loginUser`,
          payload
        );

        if (data.success) {
          setToken(data.user.accesstoken);
          setUser(data.user);
          localStorage.setItem("token", data.user.accesstoken);

          toast.success("Login Successful!");
          setShowLogin(false);
        } else {
          toast.error(data.message);
        }
      }

      // ================= SIGNUP =================
      else {
        if (!firstName || !lastName) {
          toast.error("Name is required");
          setLoading(false);
          return;
        }

        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          setLoading(false);
          return;
        }

        if (method === "Mobile" && !verifiedPhone) {
          toast.error("Please verify your phone number");
          setLoading(false);
          return;
        }

        const payload =
          method === "Email"
            ? { firstName, middleName, lastName, email, password }
            : { firstName, middleName, lastName, mobileNumber, password };

        const { data } = await axios.post(
          `${backendUrl}/api/v1/user/registerUser`,
          payload
        );

        if (data.success) {
          toast.success(data.message);
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }

    setLoading(false);
  };

  // Disable scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "unset");
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center p-4 overflow-auto">
      <motion.div
        initial={{ opacity: 0.3, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative"
      >
        {/* Close Button */}
        <RxCross1
          className="absolute top-4 right-4 cursor-pointer text-xl text-gray-600 hover:text-black"
          onClick={() => setShowLogin(false)}
        />

        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-neutral-800 mb-6">
          {mode === "Login" ? "Login" : "Signup"}
        </h1>

        {/* Tabs */}
        <div className="flex justify-center mb-5 gap-4">
          <button
            onClick={() => setMethod("Email")}
            className={`px-4 py-2 rounded-full text-sm ${
              method === "Email"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Email
          </button>

          <button
            onClick={() => setMethod("Mobile")}
            className={`px-4 py-2 rounded-full text-sm ${
              method === "Mobile"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Mobile
          </button>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* ================= NAME (SIGNUP) ================= */}
          {mode === "Signup" && (
            <>
              {/* First Name */}
              <div className="flex items-center gap-3 border p-2 rounded-full">
                <FaRegUser className="text-lg" />
                <input
                  type="text"
                  placeholder="First Name"
                  className="flex-1 outline-none"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              {/* Middle Name */}
              <div className="flex items-center gap-3 border p-2 rounded-full">
                <FaRegUser className="text-lg" />
                <input
                  type="text"
                  placeholder="Middle Name (optional)"
                  className="flex-1 outline-none"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>

              {/* Last Name */}
              <div className="flex items-center gap-3 border p-2 rounded-full">
                <FaRegUser className="text-lg" />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="flex-1 outline-none"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          {/* ================= EMAIL MODE ================= */}
          {method === "Email" && (
            <>
              <div className="flex items-center gap-3 border p-2 rounded-full">
                <CiMail className="text-xl" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="flex-1 outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* SEND button only when Signup + email exists */}
                {mode === "Signup" && email.length > 0 && (
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        const { data } = await axios.post(
                          `${backendUrl}/api/v1/user/reverify`,
                          { email }
                        );

                        if (data.success) toast.success("Verification link sent!");
                        else toast.error(data.message);
                      } catch {
                        toast.error("Failed to send link");
                      }
                    }}
                    className="text-blue-600 font-semibold text-sm hover:underline"
                  >
                    SEND
                  </button>
                )}
              </div>

              {mode === "Signup" && email.length > 0 && (
                <p className="text-xs text-blue-700 pl-3">
                  A verification link will be sent to this email.
                </p>
              )}
            </>
          )}

          {/* ================= MOBILE MODE ================= */}
          {method === "Mobile" && (
            <>
              <div className="flex items-center gap-3 border p-2 rounded-full">
                <IoIosCall className="text-lg" />
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="flex-1 outline-none"
                  maxLength="10"
                  value={mobileNumber}
                  onChange={(e) =>
                    setMobileNumber(e.target.value.replace(/\D/g, ""))
                  }
                  required
                />

                {mode === "Signup" &&
                  (!otpSent ? (
                    <button
                      type="button"
                      className="text-blue-600 text-sm"
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">OTP Sent</span>
                  ))}
              </div>

              {mode === "Signup" && otpSent && (
                <div className="flex items-center gap-3 border p-2 rounded-full">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    className="flex-1 outline-none"
                    maxLength="6"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, ""))
                    }
                  />

                  {!verifiedPhone ? (
                    <button
                      type="button"
                      className="text-blue-600 text-sm"
                      onClick={handleVerifyOtp}
                    >
                      Verify
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">✓</span>
                  )}
                </div>
              )}
            </>
          )}

          {/* ================= PASSWORD ================= */}
          <div className="flex items-center gap-3 border p-2 rounded-full">
            <RiLockPasswordFill className="text-xl" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="flex-1 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {showPassword ? (
              <IoEyeOutline
                className="text-xl cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoEyeOffOutline
                className="text-xl cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Confirm Password (Signup only) */}
          {mode === "Signup" && (
            <div className="flex items-center gap-3 border p-2 rounded-full">
              <RiLockPasswordFill className="text-xl" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="flex-1 outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              {showPassword ? (
                <IoEyeOutline
                  className="text-xl cursor-pointer"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <IoEyeOffOutline
                  className="text-xl cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
          )}

          {/* Remember me + Forgot Password (Login only) */}
          {mode === "Login" && (
            <div className="flex justify-between items-center text-sm px-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="cursor-pointer" />
                <span className="text-gray-600">Remember me</span>
              </label>

              <button
                type="button"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-blue-600 text-white text-lg hover:bg-blue-700"
          >
            {loading ? "Please wait..." : mode}
          </button>

          {/* Login / Signup switch at bottom */}
          <p className="text-center text-sm mt-4">
            {mode === "Login" ? (
              <>
                Don’t have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setMode("Signup")}
                >
                  Signup
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  className="text-blue-600 cursor-pointer hover:underline"
                  onClick={() => setMode("Login")}
                >
                  Login
                </span>
              </>
            )}
          </p>
        </form>

        {/* Social Login */}
        <div className="text-center mt-5">
          <p className="text-gray-500 mb-3 text-sm">Or continue with</p>

          <div className="flex justify-center gap-4">
            <button className="p-3 border rounded-full hover:bg-gray-100">
              <FaGoogle className="text-red-500 text-xl" />
            </button>

            <button className="p-3 border rounded-full hover:bg-gray-100">
              <FaFacebook className="text-blue-600 text-xl" />
            </button>

            <button className="p-3 border rounded-full hover:bg-gray-100">
              <FaApple className="text-black text-xl" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
