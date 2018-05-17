'use strict';

class SourceRecord {
    constructor(clientRef, bankAccount, id, accountName, value, instalments){
        this.clientRef = clientRef;
        this.bankAccount = bankAccount;
        this.id = id;
        this.accountName = accountName;
        this.value = value;
        this.instalments = instalments;
    }
}

module.exports = SourceRecord;
