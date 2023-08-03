import express, { Express, Request, Response, NextFunction, RequestHandler } from "express";
import dotenv from "dotenv";

dotenv.config()

const app: Express = express()
app.use(express.json())

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
        name: "Sara",
    }
]
// routes:
// CREATE
app.post("/users", (req: Request, res: Response) => {
    const newUser = {
        name: req.body.name,
        id: Date.now(),
    }
    users.push(newUser)
    res.json(newUser)
})
// READ
app.get("/users", (req: Request, res: Response) => {

    res.json(users)
    
})

// UPDATE
app.put("/users", (req: Request, res: Response) => {
    const {name, id} = req.body;
    users = users.map((user) => {
        if(user.id === id){
            user.name = name
        } 
        return user
    })
    res.json(users)
})

// DELETE
app.delete("/users", (req: Request, res: Response) => {
    const {id} = req.body
    users = users.filter((user) => user.id !== id)
    res.json(users)
})

// MIDDLEWARE
const isAuthorized: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if(authHeader === 'mysecretvalue'){
        next()
    }else {
        res.status(401)
        res.json({msg: "no access"})
    }
}

// GET ONE USER
// if you want in js convert something from string to a number add +
app.get("/users/:id", isAuthorized, (req: Request, res: Response) => {
    const id = +req.params.id
    const user = users.filter(user => user.id === id)
    res.json(user)
})


// start server
app.listen(port, () => console.log(`Listening for requests on port ${port}`));
