import XlsxPopulate from "xlsx-populate";
import sendEmail from "../services/sendEmail.js";
import getXlsx from "../services/getXlsx.js";
//lista de responsables
const responsibleList = [[141489, "sergio.escobar.henao@gmail.com"]];

const ProcessController = {
    
  attach:  async (req, res) => {
    try{
    const filePath = req.file.path;
    console.log(filePath);
    const productsList = await getXlsx(filePath)
    console.log(productsList);

    // //organization de destinatarios y productos
    for (let i = 0; i < responsibleList.length; i++) {
      console.log("trabajando!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      const list = productsList.filter(
        (e) => e["Producto base"] == responsibleList[i][0]
      );
      console.log(list);
      const emailDestination = responsibleList[i][1];

      // Supongamos que 'list' es un array de objetos JSON como el que proporcionaste anteriormente.

// Convertir cada objeto JSON en una tabla HTML individual y unirlos
const htmlTables = list.map(item => {
    return `
        <table>
            <tr>
                <th>Clave</th>
                <th>Valor</th>
            </tr>
            ${Object.entries(item).map(([key, value]) => `
                <tr>
                    <td>${key}</td>
                    <td>${value}</td>
                </tr>
            `).join('')}
        </table>
    `;
}).join('<br><br>'); // Se utiliza <br> para separar cada tabla HTML en el correo

// Unir todas las tablas HTML en un solo contenido HTML
const htmlContent = `
    <html>
    <head>
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
            }
            th, td {
                border: 1px solid black;
                padding: 8px;
                text-align: left;
            }
        </style>
    </head>
    <body>
        <h2>Productos para asegurar</h2>
        ${htmlTables}
    </body>
    </html>
`;

// Envía el correo electrónico
sendEmail(emailDestination, "Productos B2B para aseguramiento", htmlContent);

    res.status(200).send('proceso exitoso');
    }
}catch(error) { console.log(error);
res.status(500).send('ocurrio un error en el proceso general')}

  },
  sendEmail: (req, res) => {
    sendEmail(
      "sergio.escobar.henao@gmail.com",
      "activación productos",
      "prueba"
    );
    res.send("correo enviado");
  },
};

export default ProcessController;
