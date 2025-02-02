const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({path: './config.env'});
const app = require('./app');
const port = process.env.PORT || 3000;
const db = process.env.DATABASE.replace(
    `<PASSWORD>`,
    process.env.DATABASE_PASSWORD
);
console.log(db);
mongoose.connect(db,{
    useNewUrlParser: true
} 
).then(() => console.log('DB connection success'))


app.listen(port, ()=>{
    console.log(`A started on ${port}`)
})
