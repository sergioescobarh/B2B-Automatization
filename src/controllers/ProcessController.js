import XlsxPopulate from "xlsx-populate";
import { Resend } from 'resend';

const resend = new Resend('re_b5reac54_65BGVPZazKGqa1BFXLzjyBeY');


const ProcessController = {
    attach: (req,res) => {
        const filePath = req.file.path;
        console.log(filePath)
        XlsxPopulate.fromFileAsync(filePath)
        .then(workbook => {
            // Procesa el archivo de Excel
            const sheet = workbook.sheet(0);
            const data = sheet.usedRange().value();

            // Envía la respuesta con los datos procesados
            res.json({ success: true, message: 'Archivo procesado correctamente', data });
        })
        .catch(error => {
            // Maneja los errores al procesar el archivo
            res.status(500).json({ success: false, message: 'Error al procesar el archivo', error });
        });
    },
    sendEmail: (req, res) => {
resend.emails.send({
  from: 'onboarding@resend.dev',
  to: 'sergio.escobar.henao@gmail.com',
  subject: 'Hello World',
  html: '<p>Congrats on sending your <strong>first email</strong>!</p>'
});
res.send('correo enviado')
    },
};

export default ProcessController;