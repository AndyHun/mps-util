'use strict';

const DefaultRecord = require('./record/DefaultRecord');

class DefaultReport {
    constructor(reportType) {
        this.reportType = reportType;
        this.header = null;
        this.data = new Array();
        this._records = new Array();
    }

    toCsv() {
        let content = '';
        if (this.header) {
            content += this._toCsvRow(this.header);
        }
        for (let rowData of this.data) {
            content += this._toCsvRow(rowData);
        }
        return content;
    }

    get records() {
        if (this._records.length === 0) {
            for (let rowData of this.data) {
                this._records.push(new DefaultRecord(rowData[0], rowData[1], rowData[2], rowData[3], rowData[4], rowData[5], rowData[6], rowData[7], rowData[8]));
            }
        }
        return this._records;
    }

    _toCsvRow(rowData) {
        return `${rowData.join(',')}\r\n`;
    }
}

module.exports = DefaultReport;
