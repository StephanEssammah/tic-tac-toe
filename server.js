import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json());

const port = process.env.PORT || 3001;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

server.listen(port, () => console.log('SERVER RUNNING ON PORT 3001'))