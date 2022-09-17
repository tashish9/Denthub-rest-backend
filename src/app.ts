import express from 'express';
import cors from 'cors';
const app = express();
const router = express.Router();

// const corsOptions = {
//   origin: 'http://localhost:3777',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

app.use(cors());
app.use(express.json());
app.use(router);
export { app, router };
