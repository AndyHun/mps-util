'use strict';

const csv = require('csv-streamify');
const fs = require('fs');
const allDataFileName = "20180331All.csv";

const parserAllData = csv({ objectMode: true});
const allDataMap = new Map();

parserAllData.on('data', function (line) {
  let key = `${line[1]}-${line[5]}-${line[6]}-${line[7].replace('.','')}`; //Reference-Instalments-Name-DebitValue
  allDataMap.set(key, true);
})


fs.createReadStream(__dirname+`/${allDataFileName}`).pipe(parserAllData);



