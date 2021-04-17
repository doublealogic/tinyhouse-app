import express = require('express');
import {listings} from "./listings";

const app = express();
const port = 9000;

app.use(express.json());

const one = 1;
const two = 2;

app.get("/", (_req, res) => res.send(`1 + 2 = ${one + two}`));

app.get("/listings", (_req, res) => {
    return res.send(listings);
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);