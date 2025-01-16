import config from '../config/config.js';
import { getSheetData } from '../utils/googlesheet.js';

export const getListadoDashboards = async (req, res) => {
    try {
        const spreadsheetId = config.google_sheet_id;
        const range = 'Hoja1!A:C'; 
        const sheetData = await getSheetData(spreadsheetId, range);
        //console.log(sheetData);
        res.render('index', {
            sheetData,user:req.user,
            hasJumbotron: true,
            jumbotron_title: "Listado de dashboard",
            jumbotron_text: "Listado de tableros disponibles para visualización"
        });
    } catch (error) {
        console.error('Error al obtener datos de la hoja de cálculo:', error);
        res.status(500).send('Error al obtener datos de la hoja de cálculo.');
    }
}

export const getDashboard = async (req, res) => {
    try {
      const spreadsheetId = config.google_sheet_id;
      const range = 'Hoja1!A:C'; 
      const sheetData = await getSheetData(spreadsheetId, range);
      //const script = sheetData[req.params.id][2]; // Asumiendo que el script está en la tercera columna
      res.render('embed', { 
        title: sheetData[req.params.id][0],
        description: sheetData[req.params.id][1],
        urlDashboard: sheetData[req.params.id][2],
        user: req.user,
        hasJumbotron: false
     });
    } catch (error) {
      console.error('Error al obtener datos de la hoja de cálculo:', error);
      res.status(500).send('Error al obtener datos de la hoja de cálculo.');
    }
}