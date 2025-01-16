import { google } from 'googleapis';
import config from '../config/config.js';

export const getSheetData =  async (spreadsheetId, range) => {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: config.google_client_email,
            private_key: config.google_private_key
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