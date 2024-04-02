import express from "express"; 
const viewsRouter = express.Router();

viewsRouter.get('/', (req,res)=>{
    res.send("Bienvenido a la automatización de procesos con Node.js y Express del B2B");
})

export default viewsRouter;