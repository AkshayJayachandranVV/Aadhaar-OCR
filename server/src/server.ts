import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import router from '../src/router/router'
import connectDB from './config/mongodb'
dotenv.config();

const app = express()


const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,// Allows cookies and credentials to be included   
};
connectDB();
app.use(cors(corsOptions));

app.use('/parse-data', router);


const port = process.env.PORT
app.listen(port, () => {
    console.log(`server is running in port : http://localhost:${port}`)
})