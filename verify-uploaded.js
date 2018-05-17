'use strict';

const CsvDefTxnReportsParser = require('./core/report/CsvDefTxnReportsParser');
const SourceReportParser = require('./core/source/SourceReportParser');
const config = require('./config');

let csvDefTxnReportsParser = new CsvDefTxnReportsParser(__dirname+ config.verifyUploaded.reportFilePath);
let sourceReportParser = new SourceReportParser(__dirname+ config.verifyUploaded.sourceReportFilePath);


let submittedMap = new Map();
csvDefTxnReportsParser.submittedReport.forEach(defaultRecord -> {
    submittedMap.set(`${defaultRecord.clientRef}-${defaultRecord.actionDate.replace(/\//g, '')}-${defaultRecord.instalment}-${defaultRecord.instalments}-${defaultRecord.accountName}-${defaultRecord.value}`, defaultRecord);
});

