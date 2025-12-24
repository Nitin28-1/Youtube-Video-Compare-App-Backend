import express from 'express'
const router=express.Router();
import {CompareVideo} from '../controller/VideoController.js'

router.route('/videoCompare').post(CompareVideo);

export default router