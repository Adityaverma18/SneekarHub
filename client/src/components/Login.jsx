import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaApple, FaGoogle, FaFacebook, FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";

const Login = () => {
  const { setShowLogin, backendUrl, setToken, setUser } =
    useContext(AppContext);

  const [authMode, setAuthMode] = useState("Login");
  const [isLoading, setIsLoading] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // Form Data
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // ✅ Send OTP
  const handleSendOtp = async () => {
    if (!phone || phone.length !== 10) {
      toast.error("Enter a valid 10-digit phone number");
      return;
    }
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/send-otp`, {
        phone,
      });
      if (data.success) {
        setOtpSent(true);
        toast.success("OTP sent successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };

  // ✅ Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      toast.error("Please enter OTP");
      return;
    }
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        phone,
        otp,
      });
      if (data.success) {
        setOtpVerified(true);
        toast.success("OTP verified successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Invalid OTP");
    }
  };

  // ✅ Submit Handler
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (authMode === "Login") {
        if (usePhone && !otpVerified) {
          toast.error("Please verify OTP before login");
          setIsLoading(false);
          return;
        }

        const payload = usePhone ? { phone } : { email, password };
        const { data } = await axios.post(`${backendUrl}/api/user/login`, payload);

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          if (rememberMe)
            localStorage.setItem("rememberMe", usePhone ? phone : email);
          setShowLogin(false);
        } else toast.error(data.message);
      } else {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match!");
          setIsLoading(false);
          return;
        }

        if (usePhone && !otpVerified) {
          toast.error("Please verify OTP before signup");
          setIsLoading(false);
          return;
        }

        const payload = usePhone
          ? { phone, password, firstName, middleName, lastName }
          : { email, password, firstName, middleName, lastName };

        const { data } = await axios.post(
          `${backendUrl}/api/user/register`,
          payload
        );

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem("token", data.token);
          setShowLogin(false);
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  // Disable scroll on background
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-black/30 flex justify-center items-center overflow-auto">
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white p-10 rounded-2xl text-slate-600 w-[90%] max-w-md max-h-[90vh] overflow-y-auto shadow-lg"
      >
        {/* Close */}
        <RxCross1
          className="absolute top-5 right-5 cursor-pointer text-xl text-gray-500 hover:text-black"
          onClick={() => setShowLogin(false)}
        />

        {/* Header */}
        <h1 className="text-center text-2xl font-semibold text-neutral-700 mb-1">
          {authMode}
        </h1>
        <p className="text-center text-sm mb-6">
          {authMode === "Login"
            ? "Welcome back! Please login to your account"
            : "Create your account to get started"}
        </p>

        {/* Signup Names */}
        {authMode === "Signup" && (
          <>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border rounded-full px-4 py-2 text-sm flex-1 mb-3 w-full"
              required
            />
            <input
              type="text"
              placeholder="Middle Name (Optional)"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              className="border rounded-full px-4 py-2 text-sm flex-1 mb-3 w-full"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border rounded-full px-4 py-2 text-sm flex-1 mb-3 w-full"
              required
            />
          </>
        )}

        {/* Email or Phone */}
        {!usePhone ? (
          <div className="flex items-center gap-2 border rounded-full px-4 py-2 mb-3">
            <CiMail className="text-lg" />
            <input
              type="email"
              placeholder="Email Address"
              className="outline-none flex-1 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        ) : (
          <div className="mb-3">
            <div className="flex items-center gap-2 border rounded-full px-4 py-2 mb-2">
              <FaRegUser className="text-lg" />
              <input
                type="tel"
                placeholder="Phone Number"
                className="outline-none flex-1 text-sm"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                maxLength="10"
                required
              />
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-blue-600 text-sm font-semibold hover:underline"
                >
                  Send OTP
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-gray-400 text-sm cursor-not-allowed"
                  disabled
                >
                  OTP Sent
                </button>
              )}
            </div>

            {/* OTP Input (inline) */}
            {otpSent && (
              <div className="flex items-center gap-2 border rounded-full px-4 py-2">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter OTP"
                  className="outline-none flex-1 text-sm"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength="6"
                />
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className={`text-sm font-semibold ${
                    otpVerified
                      ? "text-green-600 cursor-default"
                      : "text-blue-600 hover:underline"
                  }`}
                  disabled={otpVerified}
                >
                  {otpVerified ? "Verified ✅" : "Verify"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Passwords */}
        {!usePhone && (
          <>
            <div className="flex items-center gap-2 border rounded-full px-4 py-2 mb-3">
              <RiLockPasswordFill className="text-lg" />
              <input
                type="password"
                placeholder="Password"
                className="outline-none flex-1 text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {authMode === "Signup" && (
              <div className="flex items-center gap-2 border rounded-full px-4 py-2 mb-3">
                <RiLockPasswordFill className="text-lg" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="outline-none flex-1 text-sm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}
          </>
        )}

        {/* Remember me */}
        {authMode === "Login" && (
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>
            <button
              type="button"
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-full mt-3 hover:bg-blue-700 transition-all"
        >
          {isLoading ? "Please wait..." : authMode}
        </button>

        {/* Toggle Login/Signup */}
        <p className="text-center text-sm mt-4">
          {authMode === "Login" ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setAuthMode("Signup")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setAuthMode("Login")}
                className="text-blue-600 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>

        {/* Toggle Phone/Email */}
        <p className="text-center text-sm mt-2 text-gray-500">
          or{" "}
          <span
            onClick={() => {
              setUsePhone(!usePhone);
              setOtpSent(false);
              setOtpVerified(false);
              setOtp("");
            }}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            {usePhone ? "Use Email instead" : "Use Phone Number instead"}
          </span>
        </p>

        {/* Divider */}
        <div className="flex items-center gap-2 my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-xs text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Social Logins */}
        <div className="flex justify-center gap-4">
          <button
            type="button"
            className="p-3 border rounded-full hover:bg-gray-100 transition"
          >
            <FaGoogle className="text-red-500 text-xl" />
          </button>
          <button
            type="button"
            className="p-3 border rounded-full hover:bg-gray-100 transition"
          >
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
          <button
            type="button"
            className="p-3 border rounded-full hover:bg-gray-100 transition"
          >
            <FaApple className="text-black text-xl" />
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
