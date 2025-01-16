import dotenv from 'dotenv';
import {Command} from 'commander';

const program = new Command();

program
    .option('--mode <mode>', 'Modo de trabajo', 'prod')
    .parse();

const environment = program.opts().mode;
if(environment.toLowerCase() === "dev"){
    dotenv.config({
        path: `.env` //.${environment}`
    });
}else{
    dotenv.config();
}

if(process.env.PORT === undefined){
    console.error(`Error al cargar el archivo .env.${mode}:`, error);
    process.exit(1); //Salir con código de error
}

export default{
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_sheet_id: process.env.GOOGLE_SHEET_ID,
    google_sheet_usuarios: process.env.GOOGLE_SHEET_USUARIOS,
    port: process.env.PORT,
    google_client_email: process.env.GOOGLE_CLIENT_EMAIL,
    google_private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    mode: environment,
    google_callback_url: process.env.GOOGLE_CALLBACK_URL
}