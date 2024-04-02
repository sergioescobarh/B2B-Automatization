import express from "express"; 
const app = express();
import viewsRouter from './src/routes/views.routes.js';
import processRouter from './src/routes/process.routes.js';

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use(express.json());

//routes:

app.use('/', viewsRouter);
app.use('/process',processRouter);


//----------------------------------------------------------------
// READ XLSX
// import { readFileSync } from "fs";
// import { read } from "xlsx/xlsx.mjs";

// const file = readFileSync("file.xlsx");
// const data  = read(file);
// console.log(data.Sheets)
//----------------------------------------------------------------

