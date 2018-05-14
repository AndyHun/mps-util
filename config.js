'use strict';

const config = {
	merchantId: 15932,
	cardAcceptor: 15932,
	branchCode: 584000,
	accountType: 1, //1:Current, 2: Savings, 3: Transmission
	frequency: 3, //0:Once Off, 1:Weekly, 2:Fortnightly, 3:Monthly, 4:First Working Day, 5:Last Working Day
	transferFileSource: '/input/data.xlsx',
	reportFilePath: '/history/report/(CSV_Download)_000000000015932_20180513060423_Output.csv',
	transferFilePath: '/history/upload/15932_2N_0513115945.csv',
	actionDate: 20180531
}

module.exports = config;
