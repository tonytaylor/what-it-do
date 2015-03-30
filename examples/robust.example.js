/* jshint node:true */
var rjs = require('requirejs');

rjs.config({ nodeRequire: require, paths: { 'fulldeck': '../lib' } });

rjs(['lodash', 'fulldeck/context'], function(_, ctx) {
	var robustScenario = ctx({
		roles: {
			'source-account': {
				'transfer': function(amount, target) {
					if (this.balance < amount) this.error('no funds');

					this.withdraw(amount);
					target.deposit(amount);
				},
				'withdraw': function(amount) { this.balance -= amount; }
			},
			'destination-account': {
				'deposit': function(amount) { this.balance += amount; }
			}
		}
	});

	var moneyTransfer = robustScenario(function(value) {
		var acctOne = { id: 39091, balance: 2500 },
			acctTwo = { id: 89238, balance: 9.25 },
			src     = this.associate('source-account', acctOne),
			dest    = this.associate('destination-account', acctTwo);

		console.log('source account: ', src);
		console.log('destination account: ', dest);

		src.transfer(value, dest);

		src = this.disassociate('source-account', src);
		dest = this.disassociate('destination-account', dest);

		console.log(src, dest);
	});

	moneyTransfer(1700.40);
});
