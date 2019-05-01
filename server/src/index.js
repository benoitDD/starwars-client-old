const express = require('express')
const app = express()

app.use(express.static(__dirname + '/../public'))

app.use((req, res, next) => {
  //If they don't request a specific file (with a dot) we send the application client
  if(req.method === 'GET' && !req.path.includes('.')){
    res.sendFile('index.html', {root: './server/public'})
    return
  }
  next()
})

const port = process.env.PORT || 5000
app.listen({port}, () =>
  console.log(`Server in mode ${process.env.NODE_ENV}, ready at http://localhost:${port}`)
)