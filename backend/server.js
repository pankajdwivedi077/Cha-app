import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js'
import MessageRoutes from './routes/message.routes.js'
import connectToMongoDB from './db/connectToMongoDB.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // to parse the incoming requests 
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", MessageRoutes)


// app.get("/", (req, res) => {
//     res.send("Hello world"); 
// })

app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server Runing on Port ${PORT}`)
})