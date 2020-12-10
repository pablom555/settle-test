const Fixer = require('./../models/fixer');

async function saveFixerDB(fixerData) {

    const fixer = new Fixer(fixerData);
    return fixer.save()

}

async function query(filter = {}) {

    return Fixer.find(filter);
    
}


module.exports = {
    saveFixerDB,
    query
}