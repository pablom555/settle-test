const { Schema, model } = require('mongoose');

const fixerSchema = new Schema({
    
    pairs: {
        type: Object,
        required: [true, 'Pair is required']
    },
    date: {
        type: Date,
        unique: true,
        required: [true, 'rate is required']
    },    

});

fixerSchema.virtual('dateFormat')
.set((dateData) => {
    this.date = new Date(dateData)
})
.get(() => {
    return this.date.toUTCString().substr(0,10)
});

module.exports = model('Fixer', fixerSchema);