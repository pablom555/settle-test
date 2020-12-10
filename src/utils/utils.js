const fetch = require("node-fetch");

const createJSONResponse = (ok, message, details) => {

    let jsonResp = {
        ok,
        message
    };

    if (!ok) {
        jsonResp.details = { err: details }
    } else {
        jsonResp.data = details
    }

    return jsonResp;
};

const fetchingApi = async (url) => {

    return fetch(url)

}

const formatFixerData = (fixerData) => {

    let EURUSD = fixerData.rates.USD;
    let EURARS = fixerData.rates.ARS;
    let EURBRL = fixerData.rates.BRL;
    let USDARS = EURARS / EURUSD;
    let USDBRL = EURBRL / EURUSD;
    let BRLARS = EURARS / EURBRL;

    return {
        date: fixerData.date,
        pairs: {
            EURUSD, EURARS, EURBRL, USDARS, USDBRL, BRLARS
        }
    }
    
}

module.exports = {
    createJSONResponse,
    fetchingApi,
    formatFixerData
}