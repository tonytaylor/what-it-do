/* globals define, console */
define([
	'intern!bdd',
	'intern/chai!expect',
	'fullDeck/lib/context',
	'fullDeck/lib/role'
], function(bdd, expect, Context, Role) {
	
	bdd.describe('A (simple) Context', function() {
		var actors = [
				{ id: '001', balance: 1000 },
				{ id: '002', balance: 250 }
			],
			roles = {
				'source': {
					'decrease': function(amount) {
						this.balance -= amount;
						console.log('account decreased by %s to %s', 
							amount, this.balance);
					}
				},
				'destination': {
					'increase': function(amount) {
						this.balance += amount;
						console.log('account increased by %s to %s', 
							amount, this.balance);
					}
				}
			};

		function enactor() {
			var src = Role(roles['source'])(actors[0]),
				dest = Role(roles['destination'])(actors[1]);
		 
		 	return function(amount) {
		 		src.decrease(amount);
		 		dest.increase(amount);
		 	};
		}

		var moneyTransfer = Context(enactor);

		bdd.it('should not blow up', function() {
			expect(moneyTransfer).to.be.ok;
		});
		
		bdd.it('should throw if no initial function and enact == null',
			function() {
				expect(Context).to.throw(Error);
				//expect(function(){ Context('foo'); }).to.throw(Error);
			}
		);
		//moneyTransfer(400);
		bdd.it('should take a function', function() {
			expect(enactor).to.be.a('Function');
			expect(function() { Context(enactor); }).to.not.throw(Error);
		});
		bdd.it('should return a function', function () {
			expect(moneyTransfer).to.be.ok;
			expect(moneyTransfer).to.be.a('Function');
		});
	});
});
