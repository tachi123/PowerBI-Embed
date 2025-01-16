import express from 'express';
import { create } from 'express-handlebars';
import passport from './config/passport.js'; // Importa la configuración de Passport
import config from './config/config.js';
import __dirname from './utils.js';
import session from 'express-session';
import handlebars from 'handlebars';

const app = express();

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuro middleware express-session
app.use(session({
    secret: 'asd3nc3okasod',
    resave: false,
    saveUninitialized: false
}));

// Configuración de Handlebars
// Handlebars setup
const hbs = create({
    extname: '.hbs',
    defaultLayout: 'main',
    helpers: {
        // Permitir HTML sin escapar
        script: function (text) {
            return new handlebars.SafeString(text);
        }
    }
  });
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');
  app.set('views', __dirname + '/views');

app.use(express.static(__dirname+ '/public'));

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Rutas
import indexRoutes from './routes/index.router.js';
import sessionRoutes from './routes/session.router.js';
app.use('/', indexRoutes);
app.use('/auth', sessionRoutes);


// Iniciar el servidor
const PORT = config.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));