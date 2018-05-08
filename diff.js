'use strict';
const xlsx = require('node-xlsx');
const fs = require('fs');
const config = require('./config.js');
const path = require('path');
const moment = require('moment');

function buildCacheKey(clientRef, instalment,instalments, accountName, money) {
    return `${clientRef}-${accountName}-${money}-${instalment}-${instalments}`;
}

function buildShortCacheKey(clientRef, accountName, money) {
    return `${clientRef}-${accountName}`;
}

function getShortCacheKey(longCacheKey) {
    let longCacheKeySplits = longCacheKey.split('-');
    longCacheKeySplits.pop();
    longCacheKeySplits.pop();
    longCacheKeySplits.pop();
    return longCacheKeySplits.join('-');
}


const reportCsv = xlsx.parse(__dirname+ config.reportFilePath)[0].data;
const reportCache = new Map();/*(key,Array)*/
const shortKeyReportCache = new Map();/*(key,Array)*/
let cacheKey,shortCacheKey,clientRef,instalment,instalments,value;
let index =0;
let reportTitle;
for(let reportRow of reportCsv) {
    index++;
    if(index === 1) {
        reportTitle = reportRow;
        continue;
    }
    cacheKey = buildCacheKey(reportRow[1],reportRow[3],reportRow[5],reportRow[6],reportRow[7]);
    shortCacheKey = buildShortCacheKey(reportRow[1],reportRow[6],reportRow[7]);
    if(!reportCache.get(cacheKey)){
        reportCache.set(cacheKey, [reportRow]);
    }else {
        reportCache.get(cacheKey).push(reportRow);
    }
    if(!shortKeyReportCache.get(shortCacheKey)){
        shortKeyReportCache.set(shortCacheKey, [reportRow]);
    }else {
        shortKeyReportCache.get(shortCacheKey).push(reportRow);
    }
}



const transferCsv = xlsx.parse(__dirname+ config.transferFilePath)[0].data;
const notMatchCache = new Map();
index =0;
let transferTitle;
for(let transferRow of transferCsv) {
    index++;
    if(index === 1) {
        transferTitle = transferRow;
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    shortCacheKey = buildShortCacheKey(transferRow[7],transferRow[2],transferRow[6]/100);
    if(!reportCache.get(cacheKey)){
        if(!notMatchCache.get(cacheKey)) {
            notMatchCache.set(cacheKey, [transferRow]);
        }else{
            notMatchCache.get(cacheKey).push(transferRow);
        }
    }
}
/*console.log(`Total not match number: ${notMatchCache.size}`);
console.log(notMatchCache.keys());
console.log(notMatchCache.get('4235-N-3--300'));*/

let content=`Total Failure:,${notMatchCache.size}\r\n`;
let idOrAccountWrongContent = buildRow(transferTitle);
let shortKeyReportRows;
function buildRow(value) {
    return `${value.join(',')}\r\n`;
}
function buildContent() {
    notMatchCache.forEach((value,key,map) => {
        shortKeyReportRows = shortKeyReportCache.get(getShortCacheKey(key));
        if(!shortKeyReportRows) {
            value.forEach(row => {
                idOrAccountWrongContent += buildRow(row);
            });
        }
        content += buildRow(transferTitle);
        value.forEach(row => {
            content += buildRow(row);
        });
        content += buildRow(reportTitle);
        if(shortKeyReportRows) {
            shortKeyReportRows.forEach(reportRow => {
                content += buildRow(reportRow);
            })
        }
        content +='\r\n';
    });
}
buildContent();
let postfix = moment().format('MMDDHHmmss');
let diffDetailFileName = `./output/diffDetail_${postfix}.csv`;
let idOrAccountWrongFilenName = `./output/IdOrAccountWrong_${postfix}.csv`;
fs.writeFile(path.resolve(__dirname, diffDetailFileName), content, function(err) {
	if(err) {
		return console.log(err);
	}
	console.log(`${diffDetailFileName} created!`);
});
fs.writeFile(path.resolve(__dirname, idOrAccountWrongFilenName), idOrAccountWrongContent, function(err) {
	if(err) {
		return console.log(err);
	}
	console.log(`${idOrAccountWrongFilenName} created!`);
});
