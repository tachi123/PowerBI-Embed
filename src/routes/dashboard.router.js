import express from 'express';
import  { isLoggedIn, isLoggedOut} from '../middlewares/auth.js';
import * as googleSheetController from '../controllers/googleSheet.controller.js';

const router = express.Router();

router.get('/', isLoggedIn, googleSheetController.getListadoDashboards);

router.get('/:id', isLoggedIn, googleSheetController.getDashboard);

export default router;