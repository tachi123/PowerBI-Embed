import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { getSheetData } from '../utils/googlesheet.js';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const spreadsheetId = process.env.GOOGLE_SHEET_USUARIOS;
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