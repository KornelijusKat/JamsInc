const mongoose = require('mongoose')
const jamSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'Jam must have a name'],
        unique: true
    },
    fruitType:{
        type:String,
        required:[true, 'Jam must have a fruit type']
    },
    batchSize:{
        type:Number,
    },
    sugarAmount:{
        type:Number,
       
    },
    ProductionDate:{
        type:Date,
        required:[true, 'Jam must have a production date']
    },
    expirationDate:{
        type:Date,
        required:[true, 'Jam must have an expiration date']
    }
})
const Jam = mongoose.model('Jam', jamSchema)
module.exports = Jam;