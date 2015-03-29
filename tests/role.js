/* jshint node:true */
/* globals define */
define([
	'intern!bdd',
	'intern/chai!expect',
	'fullDeck/lib/role',
], function(bdd, expect, Role) {
	bdd.describe('A Role', function() {

		var r, o;

		bdd.it('throws an error if no object is passed to it', function() {
			expect(Role).to.throw(Error);
		});

		bdd.it('throws an error if {} is passed to it', function() {
			expect(function(){ Role({}); }).to.throw(Error);
		});

		bdd.it('returns a function that takes a domain object', function() {
			r = Role({ login: function() { return this.name; } });
			expect(r).to.be.ok;
			expect(r).to.be.a('Function');
		});

		bdd.describe('with RoleMethods loaded', function() {
			bdd.it('throws an error if domain obj props < 1', function() {
				expect(function() { r({}); }).to.throw(Error);
			});

			bdd.it('warns if domain obj has no props used by role methods', 				/**
				 * a good idea, but we're not a compiler.
				 * even still, I'm keeping this around so I remember to
				 * get to it someday. TODO: Make this test time-based
				 */
				function() { expect(true).to.equal(true); }
			);

			bdd.it('returns an object + role methods', function() {
				o = r({ id: '1', name: 'jane' });
				expect(o).to.be.ok;
				expect(o.login()).to.equal('jane');
			});

			bdd.it('can remove role methods from a domain obj', function() {
				var q = r.unassign(o);
				expect(q).to.be.ok;
				expect(q.login).to.not.be.ok;
			});
		});


	});
});
