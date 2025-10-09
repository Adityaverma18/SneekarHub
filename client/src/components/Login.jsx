import React, { useEffect, useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaApple, FaGoogle, FaRegUser } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { RiLockPasswordFill } from "react-icons/ri";
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';
import axios from 'axios';
import { AppContext } from '../context/AppContext.jsx';

const Login = () => {
  const [state, setState] = useState('Login'); // Login or Sign Up
  const { setShowLogin, backendUrl, setToken, setUser } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          if (rememberMe) localStorage.setItem('rememberMe', email);
          setShowLogin(false);
        } else toast.error(data.message);
      } else {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match!");
          setIsLoading(false);
          return;
        }

        const { data } = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });

        if (data.success) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem('token', data.token);
          setShowLogin(false);
        } else toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className='mt-5 z-20 backdrop-blur-sm flex justify-center items-center'>
      <motion.form
        onSubmit={onSubmitHandler}
        initial={{ opacity: 0.2, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='relative bg-white p-10 rounded-xl text-slate-500 w-[90%] max-w-md'
      >
        {/* Close */}
        <RxCross1 className='absolute top-5 right-5 cursor-pointer' onClick={() => setShowLogin(false)} />

        {/* Title */}
        <h1 className='text-center text-2xl text-neutral-700 font-medium mb-1'>{state}</h1>
        <p className='text-sm text-center mb-5'>
          {state === 'Login' ? "Welcome Back! Please sign in to continue." : "Create your account to start shopping."}
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-5">
          <button
            type="button"
            className={`px-4 py-1 rounded-full ${state === 'Login' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setState('Login')}
          >
            Login
          </button>
          <button
            type="button"
            className={`px-4 py-1 rounded-full ${state === 'Sign Up' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
            onClick={() => setState('Sign Up')}
          >
            Sign Up
          </button>
        </div>

        {/* Name (Sign Up) */}
        {state === 'Sign Up' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mb-4'>
            <FaRegUser />
            <input
              type="text"
              placeholder='Full Name'
              className='outline-none text-sm w-full'
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
        )}

        {/* Email */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mb-4'>
          <CiMail />
          <input
            type="email"
            placeholder='Email Id'
            className='outline-none text-sm w-full'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className='border px-6 py-2 flex items-center gap-2 rounded-full mb-4'>
          <RiLockPasswordFill />
          <input
            type="password"
            placeholder='Password'
            className='outline-none text-sm w-full'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm Password (Sign Up) */}
        {state === 'Sign Up' && (
          <div className='border px-6 py-2 flex items-center gap-2 rounded-full mb-4'>
            <RiLockPasswordFill />
            <input
              type="password"
              placeholder='Confirm Password'
              className='outline-none text-sm w-full'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}

        {/* Remember Me (Login) */}
        {state === 'Login' && (
          <label className='flex items-center gap-2 mb-4 cursor-pointer'>
            <input
              type='checkbox'
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className='rounded'
            />
            <span className='text-sm'>Remember me</span>
          </label>
        )}

        {/* Forgot Password */}
        {state === 'Login' && (
          <p className='text-sm text-blue-600 mb-4 cursor-pointer'>Forgot password?</p>
        )}

        {/* Submit */}
        <button
          type='submit'
          className='bg-blue-600 w-full text-white py-2 rounded-full mb-4 disabled:opacity-50'
          disabled={isLoading}
        >
          {isLoading ? (state === 'Login' ? 'Signing in...' : 'Creating account...') : (state === 'Login' ? 'Login' : 'Create Account')}
        </button>

        {/* Social Login */}
        <div className='text-center text-sm text-gray-500 mb-4'>Or continue with</div>
        <div className="flex gap-4">
          <button className="flex items-center justify-center w-1/2 border rounded-lg py-2 hover:bg-gray-50">
            <FaGoogle className="w-5 h-5 mr-2" /> Google
          </button>
          <button className="flex items-center justify-center w-1/2 border rounded-lg py-2 hover:bg-gray-50">
            <FaApple className="w-5 h-5 mr-2 text-gray-800" /> Apple
          </button>
        </div>

        {/* Switch */}
        <p className='mt-4 text-center text-sm'>
          {state === 'Login' ? (
            <>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Sign Up')}>Sign Up</span></>
          ) : (
            <>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState('Login')}>Login</span></>
          )}
        </p>
      </motion.form>
    </div>
  );
};

export default Login;
