const express = require('express')
const helmet = require('helmet')
const server = express();
const postRouter = require("./posts/postRouter")


server.use(express.json());
server.use(helmet());
server.use("/api/posts", postRouter)


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware



module.exports = server;
