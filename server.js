const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const morgan = require('morgan')
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

routes(app);

app.use('/auth', require('./middleware'))

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});