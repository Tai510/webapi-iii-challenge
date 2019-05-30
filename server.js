const express = require('express')
const helmet = require('helmet')
const server = express();
const userRouter = require("./users/userRouter")


server.use(express.json());
server.use(helmet());
// server.use(logger);
server.use("/api/users", userRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware! ${process.env.MOTD}</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   console.log(`Method: ${req.method}, url: ${req.url}, timestamp: ${new Date().toISOString()}`);
//   next();
// }


module.exports = server;
