/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const quotes = require('./quotes.json');

const Alexa = require('alexa-sdk');

const APP_ID = "amzn1.ask.skill.d76a0a14-b806-4753-a3fd-6142a1b06ba3";

const handlers = {
    'LaunchRequest': function () {
        this.emit('getquote')
    },
    'getquote': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        
        //const factArr = this.t('FACTS');

        //JSON.parse(process.env.resources)[2]

        let rand = Math.random();
        let max = quotes.length - 1;
        //rand + " " + max + " " + 
        this.emit(':tellWithCard', quotes[parseInt(rand * max)].replace(".", ". ").replace(":", ": ").replace(",", ", "));
    },
    'AMAZON.HelpIntent': function () {
        this.emit(':ask', "ask me for a quote and i will give you some nurture for your mind and fullfill your philosophical needs");
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};