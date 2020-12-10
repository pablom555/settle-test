const { Schema, model } = require('mongoose');

let ratesValid = {
    values: ['EURUSD', 'EURARS', 'EURBRL', 'USDARS', 'USDBRL', 'BRLARS'],
    message: '{VALUE} Does not a rate valid'
};

const rateSchema = new Schema({

    pair: {
        type: String,
        unique: true,
        required: [true, 'Pair is required'],
        enum: ratesValid
    },
    fee: {
        type: Number,
        min: 0,
        max: 100,
        required: [true, 'Fee is required']
    }    
});

module.exports = model('Rate', rateSchema);