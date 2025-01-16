import express from 'express';
import  { isLoggedIn, isLoggedOut} from '../middlewares/auth.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    hasJumbotron: true,
    jumbotron_title: "Portal de Información Interno",
    jumbotron_text: "Portal de visualización de datos internos"
  })
});

router.get('/login', isLoggedOut, (req, res) => {
  res.render('login', {
        hasJumbotron: true,
        jumbotron_title: "Portal de Información Interno",
        jumbotron_text: "Portal de visualización de datos internos"
    });
});

export default router;