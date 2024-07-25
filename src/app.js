import express from 'express'
import morgan from 'morgan';
import bodyParser from 'body-parser';
const app = express();
/**/
import path from 'path';
import { fileURLToPath } from 'url';
import indexRouter from './routes/index.routes.js';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**/
app.set('view engine','ejs');
/**/
app.set('views', path.join(__dirname, 'views'));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));
/* */
app.use(morgan('tiny'));
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
/*importamos routes de empresa*/
import empresaRoutes from './routes/empresa.routes.js'
import indexRoutes   from './routes/index.routes.js';
import loginRoutes   from './routes/login.routes.js';
import CNAE          from './routes/CNAE.routes.js';
app.use(empresaRoutes);
app.use(indexRoutes);
app.use(loginRoutes);
app.use(CNAE);
/*exportamos*/
export default app;