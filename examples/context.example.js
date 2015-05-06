/* jshint node:true */
var rjs = require('requirejs');

rjs.config({ nodeRequire: require, paths: { 'fulldeck': '../lib' }});

rjs(['lodash', 'fulldeck/ctx'], function(_, Context) {
	var MoneyTransferContext = Context({
		roleMethods: {
			'src-acct': { 
				'withdraw': function (amt) { this.balance -= amt; } 
			},
			'dest-acct': {
				'deposit': function (amt) { this.balance += amt; } 
			}
		},
		init: function(src, dest) {
			this.bindRolesToContext({'src-acct': src, 'dest-acct': dest});
		}
	});

	MoneyTransferContext.transfer = function(amount) {
		if (this.roles['src-acct'].balance - amount < 0) {
			this.error('nsferror');
		}

		this.roles['src-acct'].withdraw(amount);
		this.roles['dest-acct'].deposit(amount);

		return this;
	};

	MoneyTransferContext.report = function() {
		_.each(this.roles, function(role, name, obj) { 
			console.log('role name: %s \n', name, role);
		});

		return this;
	};

	MoneyTransferContext(
		{id: 2800, balance: 2400.02},
		{id: 2304, balance: 275.0}
	).transfer(400.75).report();

	try {
		MoneyTransferContext(
			{id: 90, balance: 0.02},
			{id: 102, balance: 4.39}
		).transfer(25.75).report();
	} catch (e) {
		var base = 'we could not complete the transfer operation:',
			msg  = [ base ];

		if (e.message === 'nsferror') {
			msg.push('there is not enough funds to complete transfer.');
		}

		console.log(msg.join('\n'));
	}
});
