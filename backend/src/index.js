const express = require('express');
const  bodyParser = require('body-parser');
const route = require('./route/route.js');
const mongoose = require('mongoose')
const fileUpload = require("express-fileupload")
const cookieParser = require('cookie-parser');
const locationMatcher = require('./route/localtionMatchRoute');

const app = express();        
const dotenv = require("dotenv");
dotenv.config();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))
//3pn3oii9geq4SIWk
mongoose.connect("mongodb://localhost:27017/taskManagment", {useNewUrlParser: true})
    .then(() => console.log('MongoDb Connected'))
    .catch(err => console.log(err))

app.use('/', route);
app.use('/location', locationMatcher)

app.listen(process.env.PORT || 3001, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
});