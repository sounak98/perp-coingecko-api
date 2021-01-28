import express from 'express';
import getPairs from './controllers/getPairs';

const app = express();

app.get('/pairs', getPairs);

export default app;
