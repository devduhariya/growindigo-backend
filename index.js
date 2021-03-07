const express = require('express');
const app = express();
const admin = require('firebase-admin');
admin.initializeApp();

const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
app.engine("html", require('ejs').renderFile)
app.use(express.static("static"));
const csrfMiddleware = csrf({ cookie: true });

app.use(bodyParser.json());

app.use(cookieParser());
app.use(csrfMiddleware);

app.all("*", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});


app.get('/', (req, res) => {
    res.render('index.html')
});
app.listen(5000, () => {
    console.log('app is listening on port 5000');
})