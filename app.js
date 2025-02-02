const express = require('express');
const morgan = require('morgan');
const jamRouter = require('./routes/jamRoutes');
const app = express();
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}
app.use(express.json());
app.use('/api/v1/jams', jamRouter)
module.exports = app;