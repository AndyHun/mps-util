'use strict';

class ReportType {
    constructor() {

    }

    static get SUBMITTED() {
        return 'Transactions Submitted';
    }

    static get CANCELLED() {
        return 'Cancelled';
    }

    static get IN_PROGRESS() {
        return 'InProgress';
    }

    static get FAILED() {
        return 'Failed';
    }

    static get FUTURE() {
        return 'Future';
    }

    static get INACTIVE() {
        return 'Inactive';
    }

    static get DISPUTE() {
        return 'Dispute';
    }
}

module.exports = ReportType;
