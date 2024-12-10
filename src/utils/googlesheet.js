import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export const getSheetData =  async (spreadsheetId, range) => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
        },
        scopes: "https://www.googleapis.com/auth/spreadsheets.readonly"
    });

    const sheets = google.sheets('v4');
    try {
        const response = await sheets.spreadsheets.values.get({
            auth,
            spreadsheetId,
            range
        });
        const rows = response.data.values;
        if (rows.length > 0) {
            rows.shift(); // Eliminar la primera fila (encabezado)
        }
        return rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
}