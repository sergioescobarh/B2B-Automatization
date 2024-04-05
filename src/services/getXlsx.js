import XlsxPopulate from "xlsx-populate";


const getXlsx = (path) => {
    
    const finalProducts = XlsxPopulate.fromFileAsync(path)
      .then((workbook) => {
        // Procesa el archivo de Excel
        const sheet = workbook.sheet(0);
        const data = sheet.usedRange().value();

        // proceso de organizacion de datos
        const titles = data[0].filter((e) => e !== undefined);
        //listar productos en un array de jsons
        const productsList = [];
        for (let i = 1; i < data.length; i++) {
          const product = {};
          for (let j = 0; j < titles.length; j++) {
            product[titles[j]] = data[i][j];
          }
          productsList.push(product);
        }
        const finalProducts = productsList.filter(
          (e) => e["Nro pedido"] !== undefined
        );

        // Envía la respuesta con los datos procesados
        console.log({
          success: true,
          message: "Archivo procesado correctamente",
          finalProducts
        });
        return finalProducts;
      })
      .catch((error) => {
        // Maneja los errores al procesar el archivo
        console
          .log(500)
          .log({
            success: false,
            message: "Error al procesar el archivo",
            error,
          });
      });
      return finalProducts;
};

export default getXlsx;