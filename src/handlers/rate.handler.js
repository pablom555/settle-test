const rateServices = require('./../services/rate.services');
const { createJSONResponse } = require('./../utils/utils');

function Rates(pair, fee, oriRate) {

    this.pair = pair
    this.OriginalRate = oriRate
    this.fee = fee
    this.feeAmount = (oriRate * fee) / 100
    this.rateFeeApplied = this.OriginalRate + this.feeAmount
}

const getRates = async (request, h) => {

    const actualFixer = request.pre.fixerActual

    try {

        const ratesDB = await rateServices.query();

        if (!ratesDB.length) return h.response(createJSONResponse(false, 'There are not Rates', 'Rates not found')).state(404)

        const ratesResp = ratesDB.map(rate => new Rates(rate.pair, rate.fee, actualFixer.pairs[rate.pair]) )
        
        return h.response(createJSONResponse(true, 'Rates found successfully', { rates: ratesResp })).state(200)

    } catch (error) {

        return h.response(createJSONResponse(false, 'Failed to find rates', error.message)).state(500)
    }
}

const getRateByID = async (request, h) => {
    
    const actualFixer = request.pre.fixerActual

    try {

        const rateDB = await rateServices.findByID(request.params.id);

        if (!rateDB) return h.response(createJSONResponse(false, 'There are not Rate', 'Rate not found')).state(404)

        return h.response(createJSONResponse(true, 'Rate found successfully', { rate: new Rates(rateDB.pair, rateDB.fee, actualFixer.pairs[rateDB.pair]) })).state(200)

    } catch (error) {

        return h.response(createJSONResponse(false, 'Failed to find rate', error.message)).state(500)
    }
    
}

const getRateByPair = async (request, h) => {

    const actualFixer = request.pre.fixerActual

    try {

        const ratesDB = await rateServices.query({pair: request.params.pair});

        if (!ratesDB.length) return h.response(createJSONResponse(false, 'There are not Rate', 'Rate not found')).state(404)

        return h.response(createJSONResponse(true, 'Rate found successfully', { rate: new Rates(ratesDB[0].pair, ratesDB[0].fee, actualFixer.pairs[ratesDB[0].pair]) })).state(200)

    } catch (error) {

        return h.response(createJSONResponse(false, 'Failed to find rate', error.message)).state(500)
    }

}

const addRate = async (request, h) => {

    try {

        const rateDB = await rateServices.saveRateDB(request.payload)

        return h.response(createJSONResponse(true, 'Rate Created successfully', { rate: rateDB })).state(201)

    } catch (error) {
        
        return h.response(createJSONResponse(false, 'Bad Request', error.message)).state(400)
    }

}

module.exports = {
    getRates,
    getRateByID,
    addRate,
    getRateByPair
}