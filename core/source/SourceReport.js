'use strict';

const SourceRecord = require('./record/SourceRecord');

class SourceReport {
    constructor() {
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
                this._records.push(new SourceRecord(rowData[1], rowData[8], rowData[6], rowData[9], rowData[10], rowData[11]));
            }
        }
        return this._records;
    }


    _toCsvRow(rowData) {
        return `${rowData.join(',')}\r\n`;
    }
}

module.exports = SourceReport;
