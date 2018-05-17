'use strict';

class DefaultRecord {
    constructor(transitionId, clientRef, actionDate, instalment, serviceType, instalments, accountName, value, frequency){
        this.transitionId = transitionId;
        this.clientRef = clientRef;
        this.actionDate = actionDate;
        this.instalment = instalment;
        this.serviceType = serviceType;
        this.instalments = instalments;
        this.accountName = accountName;
        this.value = value;
        this.frequency = frequency;
    }
}

module.exports = DefaultRecord;
