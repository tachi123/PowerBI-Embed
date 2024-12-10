import express from 'express';
import passport from 'passport';
import { getSheetData } from '../utils/googlesheet.js';
import  { isLoggedIn, isLoggedOut} from '../middlewares/auth.js';

const router = express.Router();


router.get('/', isLoggedIn, async (req, res) => {

  try {
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = 'Hoja1!A:C'; 
    const sheetData = await getSheetData(spreadsheetId, range);
    console.log(sheetData);
    res.render('index', { sheetData,user:req.user });
  } catch (error) {
    console.error('Error al obtener datos de la hoja de cálculo:', error);
    res.status(500).send('Error al obtener datos de la hoja de cálculo.');
  }


});

router.get('/embed/:id', isLoggedIn, async (req, res) => {
    try {
      const spreadsheetId = process.env.GOOGLE_SHEET_ID;
      const range = 'Hoja1!A:C'; 
      const sheetData = await getSheetData(spreadsheetId, range);
      const script = sheetData[req.params.id][2]; // Asumiendo que el script está en la tercera columna
      res.render('embed', { script, user: req.user });
    } catch (error) {
      console.error('Error al obtener datos de la hoja de cálculo:', error);
      res.status(500).send('Error al obtener datos de la hoja de cálculo.');
    }
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/login', isLoggedOut, (req, res) => {
  res.render('login');
});


export default router;