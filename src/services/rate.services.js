const Rate = require('./../models/rate');

async function saveRateDB (rateData) {

    const rate = new Rate(rateData);
    return rate.save()

}

async function query(filter = {}) {

    return Rate.find(filter);

}


async function findByID(id) {

    return Rate.findById(id);

}

module.exports = {
    saveRateDB,
    query,
    findByID
}