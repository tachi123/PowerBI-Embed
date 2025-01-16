import express from 'express';
import  { isLoggedIn, isLoggedOut} from '../middlewares/auth.js';
import * as googleSheetController from '../controllers/googleSheet.controller.js';

const router = express.Router();

router.get('/', isLoggedIn, googleSheetController.getListadoDashboards);

router.get('/embed/:id', isLoggedIn, googleSheetController.getDashboard);

router.get('/login', isLoggedOut, (req, res) => {
  res.render('login', {
        hasJumbotron: true,
        jumbotron_title: "Portal de Información Interno",
        jumbotron_text: "Portal de visualización de datos internos"
    });
});

export default router;