import dotenv from "dotenv"
//Load all the environment variables from .env file into process.env
dotenv.config();
import experss from "express";
// import swagger from "swagger-ui-express";
import cors from "cors";
import userRouter from "./src/features/users/user.routes.js";
import taskRouter from "./src/features/tasks/task.routes.js";
import bodyParser from "body-parser";
import jwtAuthorizer from "./src/middlewares/auth.jwt.js";
import connectDB from "./src/config/dbConnection.js";



const server = experss();

// configure cors policy 
var corsOptions = {
    origin: "http://localhost:3000", 
    // allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],  
}
server.use(cors(corsOptions));

server.use(bodyParser.json());
// server.use(loggerMiddleware);

// server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// server.use("/api/products", jwtAuthorizer,productRouter) 
server.use("/api/users", userRouter)
server.use("/api/tasks",jwtAuthorizer, taskRouter)
server.get("/ping", (req, res) => {
    res.send("PONG");
})
// server.use("/api/cart", loggerMiddleware,jwtAuthorizer, cartRouter)
// server.use("/api/orders", jwtAuthorizer, orderRouter)


server.use((req,res) => {
    res.status(404).send("This is task management api");
})


server.listen(4000, () => {
    console.log("Listening on port 4000"); 
    connectDB();
})