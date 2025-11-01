import express from 'express'
import { allUser, changePassword, forgotPassword, getUserById, loginUser, logout, registerUser, reverify, verify, verifyEmailOtp } from '../controllers/userController.js'
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
router.get('/allUser',isAuthenticated, isAdmin, allUser)
router.get('/getUserById/:userId',getUserById)

//http://localhost:8000/api/v1/user/registerUser


export default router