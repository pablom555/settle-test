const moment = require('moment');
const fixerServices = require('./../services/fixer.Services');
const { createJSONResponse, fetchingApi, formatFixerData } = require('./../utils/utils');

const validSymbol = ['USD', 'ARS', 'BRL'];

const getFixer = async (request, h) => {

    try {

        const DAT_NOW = moment().format('YYYY-MM-DD');

        const fixerDB = await fixerServices.query({ date: DAT_NOW });

        if (fixerDB.length) return fixerDB[0]

        const fixerResponse = await fetchingApi(`${process.env.URL_API_FIXER}?access_key=${process.env.APIKEY_FIXER}&symbols=${validSymbol.join()}`)
        const fixerData = await fixerResponse.json();

        const fixerDataFormat = formatFixerData(fixerData)
        const fixerNewDB = await fixerServices.saveFixerDB(fixerDataFormat)

        return fixerNewDB

    } catch (error) {

        return h.response(createJSONResponse(false, 'Internal Error', error.message)).state(500).takeover()
    }

}

module.exports = {
    getFixer
}