import express from 'express'
import ocrController from '../controller/ocrController'
import upload from '../utils/multer';
const router = express.Router();



router.post("/",upload.fields([{ name: 'aadharFront' }, { name: 'aadharBack' }]),ocrController)


export default router