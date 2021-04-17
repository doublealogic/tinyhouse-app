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

app.post("/delete-listing", (req, res) => {
    const id: string = req.body.id;

    for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
            return res.send(listings.splice(i, 1));
        }
    }

    return res.send("failed to delete listing");
});

app.listen(port);

console.log(`[app]: http://localhost:${port}`);