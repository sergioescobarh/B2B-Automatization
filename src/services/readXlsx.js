import { readFileSync } from "fs";
import { read } from "xlsx/xlsx.mjs";

const readFile = (input) => {
    // const file = readFileSync("file.xlsx");
const data  = read(input);
console.log(data.Sheets)
return data
};

export default readFile;