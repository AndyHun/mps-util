'use strict';
const xlsx = require('node-xlsx');
const fs = require('fs');
const config = require('./config.js');
const path = require('path');
const moment = require('moment');

function buildCacheKey(clientRef, instalment,instalments, accountName, money) {
    return `${clientRef}-${accountName}-${money}-${instalment}-${instalments}`;
}
//D:\WorkSpace\GTC\mps-util\history\upload\15932_2N_0508191311.csv
//D:\WorkSpace\GTC\mps-util\history\upload\15932_2N_0510194219.csv
//D:\WorkSpace\GTC\mps-util\history\upload\15932_2N_0513115945.csv
//D:\WorkSpace\GTC\mps-util\history\upload\15932_2N_0516090424.csv

const transferCsv1 = xlsx.parse(path.resolve(__dirname, './history/upload/15932_2N_0517205056.csv')+ '')[0].data;
const transferCsv2 = xlsx.parse(path.resolve(__dirname, './history/upload/15932_2N_0508191311.csv'))[0].data;
const transferCsv3 = xlsx.parse(path.resolve(__dirname, './history/upload/15932_2N_0510194219.csv'))[0].data;
const transferCsv4 = xlsx.parse(path.resolve(__dirname,'./history/upload/15932_2N_0513115945.csv'))[0].data;
const transferCsv5 = xlsx.parse(path.resolve(__dirname, './history/upload/15932_2N_0516090424.csv'))[0].data;

const transferCsv6 = xlsx.parse(path.resolve(__dirname, './history/upload/fix/15932_2N_0508191312.csv'))[0].data;
const transferCsv7 = xlsx.parse(path.resolve(__dirname, './history/upload/fix/15932_2N_0508191313.csv'))[0].data;
const transferCsv8 = xlsx.parse(path.resolve(__dirname, './history/upload/fix/15932_2N_0510195541.csv'))[0].data;
const transferCsv9 = xlsx.parse(path.resolve(__dirname, './history/upload/fix/15932_2N_0513120757.csv'))[0].data;
const transferCsv10 = xlsx.parse(path.resolve(__dirname,'./history/upload/fix/15932_2N_0516091142.csv'))[0].data;


let index2=0;
let cache2 = new Map();
let cacheKey=null;
for(let transferRow of transferCsv2) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}
index2 =0;
for(let transferRow of transferCsv3) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}
index2 =0;
for(let transferRow of transferCsv4) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}
index2 =0;
for(let transferRow of transferCsv5) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}






index2 =0;
for(let transferRow of transferCsv6) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}
index2 =0;
for(let transferRow of transferCsv7) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}
index2 =0;
for(let transferRow of transferCsv8) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}
index2 =0;
for(let transferRow of transferCsv9) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}
index2 =0;
for(let transferRow of transferCsv10) {
    index2++;
    if(index2 === 1) {
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    cache2.set(cacheKey, transferRow);
}













let index =0;
let transferTitle;
let matchList = new Array();
for(let transferRow of transferCsv1) {
    index++;
    if(index === 1) {
        transferTitle = transferRow;
        continue;
    }
    cacheKey = buildCacheKey(transferRow[7],1,transferRow[5],transferRow[2],transferRow[6]/100);
    if(cache2.get(cacheKey)) {
        matchList.push(cache2.get(cacheKey));
    }
}
for(let row of matchList) {
    console.log(row.join(','));
}