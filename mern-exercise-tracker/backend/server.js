const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app  = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,  useUnifiedTopology: true  }
);
const connection = mongoose.connection;
connection.once('open', () =>{
    console.log("mongoDB database connection established successfully");
})
/*const uri = `mongodb+srv://sathyasakthivel:livessasi@143@mongodb01.qjaap.mongodb.net/test?retryWrites=true&w=majority`;   
const uri = `mongodb+srv://sathyasakthivel:livessasi@143@mongodb01.qjaap.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Mongodb connected')
})
.catch(err => console.log(err))*/

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});