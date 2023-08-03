const port = 7800
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express();
router.use(cors());

mongoose.connect('mongodb+srv://KrishnaG:Mongo12345@cluster0.g6wjezd.mongodb.net/?retryWrites=true&w=majority');
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
