require('dotenv').config();
const port = process.env.SERVICE_PORT
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express();
router.use(cors());
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})
const routes = require('./routes/routes');
app.use('/api', routes)
const mainRoute = require('./routes/mainRoute');
app.use('/', mainRoute)
