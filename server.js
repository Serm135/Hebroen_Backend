const express = require('express');
const bodyParser = require('body-parser');

const app = express();
cors = require("cors");
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

const sendMail = require('./services/mailsender');
app.use('/send',sendMail);

const editExcel = require('./services/create_excel');
app.use('/excel',editExcel);

app.listen(8080);