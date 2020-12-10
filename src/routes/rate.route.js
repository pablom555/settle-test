const Joi = require('@hapi/joi');

const rateHandlers = require('../handlers/rate.handler');
const { createJSONResponse } = require('./../utils/utils');
const preActions = require('./../preActions/preActions');

const routes = [
    {
        method: 'GET',
        path: '/rates',
        options: {
            pre: [
                { method: preActions.getFixer, assign: 'fixerActual'}
            ],
            handler: rateHandlers.getRates
        }
    },
    {
        method: 'GET',
        path: '/rate/{id}',
        options: {
            pre: [
                { method: preActions.getFixer, assign: 'fixerActual' }
            ],
            handler: rateHandlers.getRateByID
        }        
        
    },
    {
        method: 'GET',
        path: '/rate/pair/{pair}',
        options: {
            pre: [
                { method: preActions.getFixer, assign: 'fixerActual' }
            ],
            handler: rateHandlers.getRateByPair
        }

    },    
    {
        method: 'POST',
        path: '/rate',
        options: {
            validate: {
                payload: Joi.object({
                    pair: Joi.string().required(),
                    fee: Joi.number().min(0).max(100).required()
                }),
                failAction: (request, h, error) => {
                    return error.isJoi ?
                        h.response(createJSONResponse(false, "Validate Error", error.details[0])).takeover() :
                        h.response(error).takeover()
                }
            }
        },
        handler: rateHandlers.addRate
    }

]

module.exports = routes;