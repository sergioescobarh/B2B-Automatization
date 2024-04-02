import express from "express";
import multer from "multer";
import ProcessController from "../controllers/ProcessController.js";

const processRouter = express.Router();
const upload = multer({ dest: 'uploads/' }); // Dónde se guardarán temporalmente los archivos cargados

processRouter.get('/', (req, res) => {
    res.send("Aquí podrás cargar el consolidado");
});

processRouter.post('/', upload.single('excelFile'), ProcessController.attach);

processRouter.get('/send-email', ProcessController.sendEmail);

export default processRouter;