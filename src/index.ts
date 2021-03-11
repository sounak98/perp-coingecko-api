import express from 'express';
import getPairs from './controllers/getPairs';

const app = express();
app.get('/pairs', getPairs);

// Routes
app.get('/*', (req, res) => {
  res.send(`Request received: ${req.method} - ${req.path}`);
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err);
    res.status(500).send('An internal server error occurred');
  }
);

module.exports = app;
export default app;
