import express from 'express'
import hbs from 'hbs'
import path from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import {getProduct, initDatabase, initTable, insertProduct} from './database.js'
import { error } from 'console'

const app = express()
const __dirname =path.resolve()
const db = initDatabase()
initTable(db)

app.set('views', __dirname + '/layouts')
app.set('view engine', 'html')
app.engine('html', hbs.__express)

//log incoming request
app.use(morgan('combined'))

//parse request body
app.use(bodyParser.urlencoded())

//serve static file
app.use('/assets', express.static(__dirname + '/assets'))

app.get('/', (req, res, next)=>{
    res.send({success: true})
})

//get product list
app.get('/product', async(req, res, next)=>{
    // //const product = getProduct(db)
    // getProduct(db).then(product =>{
    //     console.log('Product result', product)
    //     res.render('product')
    // }).catch(error =>{
    //     console.error(error)
    // })
    // // console.log('product result', product)
    // // res.render('product')

    let product
    try {
        product = await getProduct(db)
    } catch (error) {
        return next(error)
    }

    res.render('product', {products})
})

//handle form GET method
app.get('/add-product', (req, res, next)=>{
    res.send(req.query)
})

//handle form POST method
app.post('/add-product', (req, res, next)=>{
    console.log('Request body', req.body)
    //insert product
    insertProduct(db, req.body.name, parseInt(req.body.price), '-')
    //res.send(req.body)

    //redirect 
    res.redirect('/product')
})

app.use((err, req, res, next)=>{
    res.send(err.message)
})

app.listen(8000, () => {
    console.log('App listen on port 8000')
})