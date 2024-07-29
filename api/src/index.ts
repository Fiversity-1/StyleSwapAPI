import express from 'express';
import cors from 'cors';

import { router } from './routes/routes';

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
