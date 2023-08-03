import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config()

const app: Express = express()

const port = process.env.PORT

let users = [
    {
        id: 1,
        name: "Jane",
    },
    {
        id: 2,
        name: "Jack",
    },
    {
        id: 3,
        name: "Nina",
    }
]
// routes:
app.get("/users", (req: Request, res: Response) => {

    res.json(users)
    
})

app.listen(port, () => console.log(`Listening for requests on port ${port}`));
