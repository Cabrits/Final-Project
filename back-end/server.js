require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const https = require('https');
const enforce = require('express-sslify');
const router = require('./routes/routes')

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router)
// Redirect all non-HTTPS traffic to HTTPS
app.use(enforce.HTTPS({ trustProtoHeader: true }));

const options = {
  key: fs.readFileSync('./cert/private.key'),
  cert: fs.readFileSync('./cert/certificate.crt')
};

https.createServer(options,app).listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});