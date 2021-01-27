import express from "express";
import getPairs from "./controllers/getPairs";

const app = express();
const port = 5000;

app.get("/pairs", getPairs);

app.listen(port, () => console.log(`Running on port ${port}`));
