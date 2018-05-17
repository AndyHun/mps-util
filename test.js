'use strict';

const CsvDefTxnReportsParser = require('./core/report/CsvDefTxnReportsParser');
const SourceReportParser = require('./core/source/SourceReportParser');
const config = require('./config');
const moment = require('moment');



/*let csvDefTxnReportsParser = new CsvDefTxnReportsParser(__dirname+ config.reportFilePath);
console.log(csvDefTxnReportsParser.submittedReport.toCsv());
console.log(csvDefTxnReportsParser.submittedReport.records.length);
console.log(csvDefTxnReportsParser.failedReport.records[0].reasonCode);*/


let sourceReportParser = new SourceReportParser(__dirname+ config.sourceReportFilePath);
console.log(sourceReportParser.sourceReport.records.length);