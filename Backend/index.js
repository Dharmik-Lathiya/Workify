const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/route')

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());



require('./Database/dbconnection')

app.use('/',routes)

app.listen(3000)