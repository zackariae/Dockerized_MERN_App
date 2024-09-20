import "dotenv/config";
import express from 'express';
import connectToDatabase from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cors from 'cors'
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import authRoutes from "./routes/auth.route";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors({credentials:true, origin:APP_ORIGIN}));
app.use(cookieParser());





app.use('/auth', authRoutes );






app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
    console.log(process.env.PORT)
    await connectToDatabase();
  });