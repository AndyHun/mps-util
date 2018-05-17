'use strict';

const DefaultReport = require('./DefaultReport');
const ReportType = require(('./ReportType'));
const FailedRecord = require('./record/FailedRecord');

class FailedReport extends DefaultReport {
    constructor() {
        super(ReportType.FAILED);
    }

    get records() {
        if (this._records.length === 0) {
            for (let rowData of this.data) {
                this._records.push(new FailedRecord(rowData[0], rowData[1], rowData[2], rowData[3], rowData[4], rowData[5], rowData[6], rowData[7], rowData[8], rowData[9]));
            }
        }
        return this._records;
    }
}

module.exports = FailedReport;
