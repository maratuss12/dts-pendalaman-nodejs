import express from 'express'
import hbs from 'hbs'
import path from 'path'

const app = express()
const __dirname =path.resolve()

app.set('views', __dirname + '/layouts')
app.set('view engine', 'html')
app.set('html', hbs.__express)

app.get('/', (req, res, next)=>{
    res.send({success: true})
})

app.use((err, req, res, next)=>{
    res.send(err.message)
})

app.listen(8000, () => {
    console.log('App listen on port 8000')
})