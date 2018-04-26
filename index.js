'use strict';

const xlsx = require('node-xlsx');
const fs = require('fs');
const config = require('./config.js');
const path = require('path');
const moment = require('moment');
//const commander = require('commander');

const obj = xlsx.parse(__dirname+ config.transferFileSource);
const excelData=obj[0].data;

class Client {
	constructor(reference, accountId, id, name) {
		this.reference = reference;
		this.accountId = accountId;
		this.id = id;
		this.name = name;
	}
}


function printTitle() {
	//console.log('Account Number,Branch Code,Account Name,Account Type,Action Date,Number Of Installments,Value of Debit,Client Reference 1,Client Reference 2,Frequency,ID Number,SMS Flag,Cell Number,Days Warning,Card Acceptor');
	content += 'Account Number,Branch Code,Account Name,Account Type,Action Date,Number Of Installments,Value of Debit,Client Reference 1,Client Reference 2,Frequency,ID Number,SMS Flag,Cell Number,Days Warning,Card Acceptor\r\n';
}

function validate(index, client, debitValue, installment, record) {
	if(isNaN(client.reference)) {
		let msg = `第${index}行数据有问题 Reference值必须是数字! >> ${client.reference}`;
		throw new Error(msg);
	}
	if(isNaN(client.accountId)) {
		let msg = `第${index}行数据有问题 AccountId! >> ${client.accountId}`;
		throw new Error(msg);
	}
	if(isNaN(client.id)) {
		let msg = `第${index}行数据有问题 ID值必须是数字! >> ${client.id}`;
		throw new Error(msg);
	}
	if(isNaN(debitValue)) {
		let msg = `第${index}行数据有问题 DebitValue值必须是数字! >> ${debitValue}`;
		throw new Error(msg);
	}
	if(isNaN(installment)) {
		let msg = `第${index}行数据有问题 Installment值必须是数字! >> ${installment}`;
		throw new Error(msg);
	}
}

function buildTransition(index, client, debitValue, installment, record) {
	validate(index, client, debitValue, installment, record);
	let debitSegment = 300;
	let debitSegments = [];
	while(debitValue > debitSegment) {
		debitValue = debitValue - debitSegment;
		debitSegments.push(debitSegment);
		debitSegment++;
	}
	if(debitValue >0) {
		if(debitValue == debitSegments[debitSegments.length-1]) {
			debitValue++;
			debitSegments.push(debitValue);
		}else {
			debitSegments.push(debitValue);
		}
	}
	for(let debitTemp of debitSegments) {
		//console.log(`${client.accountId},${config.branchCode},${client.name},${config.accountType},20180430,${installment},${debitTemp}00,${client.reference},${client.reference},${config.frequency},${client.id},0,0,0,${config.cardAcceptor}`);
		content += `${client.accountId},${config.branchCode},${client.name},${config.accountType},20180430,${installment},${debitTemp}00,${client.reference},${client.reference},${config.frequency},${client.id},0,0,0,${config.cardAcceptor}\r\n`
	}
}

const clientCache = new Map();
let reference = null;
let debitValue = 0;
let installment = 1;
let client = null;
let index = 0;
let content='';
/*Print Title*/
printTitle();
for(let record of excelData) {
	if(index == 0) {
		index ++;
		continue;
	}
	reference = (new String(record[0])).trim();
	debitValue = (new String(record[4])).trim();
	installment = (new String(record[5])).trim();
	client = clientCache.get(reference);
	if(!client) {
		client = new Client(reference, (new String(record[1])).trim(), (new String(record[2])).trim(), (new String(record[3])).trim());
		clientCache.set(reference, client);
	}
	buildTransition(index, client, debitValue, installment, record);
	index++;
}
let csvFileName = `./output/${config.merchantId}_2N_${moment().format('MMDDHHmmss')}.csv`;
fs.writeFile(path.resolve(__dirname, csvFileName), content, function(err) {
	if(err) {
		return console.log(err);
	}
	console.log(`${csvFileName} created!`);
});
