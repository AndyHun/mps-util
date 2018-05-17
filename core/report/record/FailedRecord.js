'use strict';
const DefaultRecord = require('./DefaultRecord.js');

class FailedRecord extends DefaultRecord{
    constructor(transitionId, clientRef, actionDate, instalment, serviceType, instalments, accountName, value, frequency, reasonCode){
        super(transitionId, clientRef, actionDate, instalment, serviceType, instalments, accountName, value, frequency, reasonCode);
        this.reasonCode = reasonCode;
    }
}

module.exports = FailedRecord;
