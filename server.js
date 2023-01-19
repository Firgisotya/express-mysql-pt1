const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});