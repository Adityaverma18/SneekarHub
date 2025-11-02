import express from 'express'
import { allUser, changePassword, changePasswordMobile, forgotPassword, getUserById, loginUser, logout, registerUser, resendMobileOtp, reverify, verify, verifyEmailOtp, verifyMobileOtp } from '../controllers/userController.js'
import { isAdmin, isAuthenticated } from '../middleware/isAuthenticated.js'

const router = express.Router()

router.post('/registerUser', registerUser)
router.post('/verify', verify)
router.post('/reverify',reverify)
router.post('/loginUser',loginUser)
router.post('/logout',isAuthenticated, logout)
router.post('/forgotPassword', forgotPassword);
router.post('/verifyEmailOtp/:email', verifyEmailOtp);
router.post('/changePassword/:email', changePassword);
router.post('/changePasswordMobile/:mobileNumber', changePasswordMobile);

router.get('/allUser',isAuthenticated, isAdmin, allUser)
router.get('/getUserById/:userId',getUserById)

router.post("/verify-mobile-otp", verifyMobileOtp);
router.post("/resend-mobile-otp", resendMobileOtp);

//http://localhost:8000/api/v1/user/registerUser


export default router