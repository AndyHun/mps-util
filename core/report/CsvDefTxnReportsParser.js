'use strict';

const DefaultReport = require('./DefaultReport');
const FailedReport = require('./FailedReport');
const ReportType = require(('./ReportType'));
const xlsx = require('node-xlsx');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

class CsvDefTxnReportsParser {
    constructor(filePath) {
        this.filePath = filePath;
        this.submittedReport = new DefaultReport(ReportType.SUBMITTED);
        this.cancelledReport = new DefaultReport(ReportType.CANCELLED);
        this.inProgressReport = new DefaultReport(ReportType.IN_PROGRESS);
        this.failedReport = new FailedReport();
        this.futureReport = new DefaultReport(ReportType.FUTURE);
        this.inactiveReport = new DefaultReport(ReportType.INACTIVE);
        this.disputeReport = new DefaultReport(ReportType.DISPUTE);
        this.csvData = null;
        this._parseCsvData();
    }

    _parseCsvData() {
        this.csvData = xlsx.parse(this.filePath,{cellDates:true})[0].data;
        let currentReport = null;
        let sectionIndex = 0;
        for (let rowData of this.csvData) {
            /*skip empty row*/
            if(rowData.length ===0){
                continue;
            }
            /*hit new section*/
            if (rowData.length === 1) {
                sectionIndex = 0;
                currentReport = this.getReport(rowData[0]);
                continue;
            }
            if (sectionIndex === 0) {
                currentReport.header = rowData;
                sectionIndex ++;
                continue;
            }
            currentReport.data.push(this._formatDate(rowData));
        }
    }

    _formatDate(rowData) {
        rowData[2] = moment(rowData[2]).format('YYYY/MM/DD');
        return rowData;
    }

    getReport(reportType) {
        switch (reportType) {
            case ReportType.SUBMITTED :
                return this.submittedReport;
            case ReportType.CANCELLED :
                return this.cancelledReport;
            case ReportType.IN_PROGRESS :
                return this.inProgressReport;
            case ReportType.FAILED :
                return this.failedReport;
            case ReportType.FUTURE :
                return this.futureReport;
            case ReportType.INACTIVE :
                return this.inactiveReport;
            case ReportType.DISPUTE :
                return this.disputeReport;
            default :
                throw new TypeError(`UnExpected ReportType:${reportType}`);
        }
    }

}

module.exports = CsvDefTxnReportsParser;
