const express = require('express')
const port = 3000
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
// 引用 body-parser
const bodyParser = require('body-parser')
const routes = require('./routes')
require('./config/mongoose')

const app = express();
app.engine('hbs',exphbs({defaultLayout:'main', extname:'.hbs'}))
app.set ('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

app.use(routes)

// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is listening on localhost:${port}`)
})