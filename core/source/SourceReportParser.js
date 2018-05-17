'use strict';

const SourceReport = require('./SourceReport');
const xlsx = require('node-xlsx');

class SourceReportParser {
    constructor(filePath) {
        this.filePath = filePath;
        this.sourceReport = new SourceReport();
        this.excelData = null;
        /*invalidExcelDataMap<String,rowData> => <SourceLine, rowData>*/
        this.invalidExcelDataMap = new Map();
        /*slotTypeDataMap<String,rowData> => <SourceLine, rowData>*/
        this.slotTypeDataMap = new Map();
        this._parseData();
    }

    _parseData() {
        this.excelData = xlsx.parse(this.filePath)[0].data;
        let index = 0, continuesHitEmptyRowIndex = 0;
        for (let rowData of this.excelData) {
            /*skip first summary row*/
            if (index === 0) {
                index++;
                continue;
            }
            /*hit header row*/
            if (index === 1) {
                this.sourceReport.header = rowData;
                index++;
                continue;
            }
            if (this._isNotEmptyRow(rowData) && !this._isSlotCardRow(rowData)) {
                continuesHitEmptyRowIndex = 0;
                this.sourceReport.data.push(rowData);
            } else if (this._isSlotCardRow(rowData)) {
                this.slotTypeDataMap.set(`${index + 1}`, rowData);
            } else {
                this.invalidExcelDataMap.set(`${index + 1}`, rowData);
                continuesHitEmptyRowIndex++;
                if (continuesHitEmptyRowIndex > 5) {
                    break;
                }
            }
            index++;

        }
    }

    _isSlotCardRow(rowData) {
        return rowData[12] && rowData[12].length > 0;
    }

    _isNotEmptyRow(rowData) {
        /*clientRef, bankAccount, id, accountName, value, instalments*/
        return (rowData[1] && rowData[8] && rowData[6] && rowData[9] && rowData[10] && rowData[11]);
    }

    get invalidRowNum() {
        return this.invalidExcelDataMap.size;
    }

    get slotTypeRowNum() {
        return this.slotTypeDataMap.size;
    }
}

module.exports = SourceReportParser;
