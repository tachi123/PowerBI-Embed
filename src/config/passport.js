import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getSheetData } from '../utils/googlesheet.js';
import config from '../config/config.js';

passport.use(
    new GoogleStrategy(
        {
            clientID: config.google_client_id,
            clientSecret: config.google_client_secret,
            callbackURL: config.google_callback_url
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const spreadsheetId = config.google_sheet_usuarios;
                const range = 'Hoja1!A:A';

                const usuariosAutorizados = await getSheetData(spreadsheetId, range);
                const emailsAutorizados = usuariosAutorizados.map(fila => fila[0]);

                if (emailsAutorizados.includes(profile.emails[0].value)) {
                    return done(null, profile);
                } else {
                    return done(null, false, { message: 'Correo electrónico no autorizado.' });
                }
            } catch (error) {
                console.error("Error en la autenticación:", error);
                return done(error);
            }
        }
    )
);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;