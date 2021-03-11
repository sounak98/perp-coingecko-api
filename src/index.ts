import express from 'express';
import getPairs from './controllers/getPairs';

const app = express();
app.get('/', (req, res) => {
  res.send(
    `
    <h1>Welcome to Perp.exchange API for coingecko.</h1>
    <h2>This was created by
    <a href="https://github.com/nanspro">@nanspro</a>,
    <a href="https://nemani.dev">@nemani</a>
    and
    <a href="https://github.com/sounak98">@sounak98</a> </h2>
    <h3> <a href="/pairs"> Click to access api</a> </h3>
    <h3> <a href="mailto:perp.gq@nemani.dev"> Click to report bugs </a> </h3>
    <h3> <a href="https://github.com/sounak98/perp-coingecko-api"> Click to view code </a> </h3>`
  );
});

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
