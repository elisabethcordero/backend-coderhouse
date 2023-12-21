import { Server } from 'socket.io';
import express from 'express'
import productsRouter, { setSocketServer } from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { engine } from 'express-handlebars';
import viewsRouter from './routes/views.router.js'
import { __dirname } from './utils.js';

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

const socketServer = new Server(httpServer);
setSocketServer(socketServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// add routers
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.engine("handlebars", engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use('/', viewsRouter);

socketServer.on("connection", (socket) => {
    
});