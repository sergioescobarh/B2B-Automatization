import XlsxPopulate from "xlsx-populate";
import { Resend } from 'resend';

const resend = new Resend('re_b5reac54_65BGVPZazKGqa1BFXLzjyBeY');

//lista de responsables
const responsibleList = [ [ 141489 , 'sergio.escobar.henao@gmail.com']]


//funvion para enviar email:
const sendEmail = ( to , content) => {
    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: to,
      subject: 'Activación productos',
      html: content
    })
      };

const ProcessController = {
    attach: (req,res) => {
        const filePath = req.file.path;
        console.log(filePath)
        XlsxPopulate.fromFileAsync(filePath)
        .then(workbook => {
            // Procesa el archivo de Excel
            const sheet = workbook.sheet(0);
            const data = sheet.usedRange().value();

            // proceso de organizacion de datos
            const titles = data[0].filter( e => e!== undefined);
            //listar productos en un array de jsons
            const productsList = [];
            for (let i = 1; i < data.length; i++) {
                const product = {};
                for (let j = 0; j < titles.length; j++) {
                    product[titles[j]] = data[i][j];
                }
                productsList.push(product);
                
            }
            const finalProducts = productsList.filter( e => e['Nro pedido'] !== undefined );
            

            //envío de correos de activación
            for (let i=0; i < responsibleList.length ; i++) {
                console.log('trabajando!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
                const list = finalProducts.filter( e => e['Producto base']==responsibleList[i][0]);
                console.log(list);
                const emailDestination = responsibleList[i][1];
                const JSONlist = list.map( e => stringify(e));
                const content = `<p>Se han activado los siguientes productos:${JSONlist}</p>`;
                sendEmail(emailDestination, content);
            }

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