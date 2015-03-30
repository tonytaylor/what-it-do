/* jshint node:true */
var r = require('requirejs');

r.config({ nodeRequire: require, paths: { 'fulldeck': '../lib' } });

r(['lemonad', 'fulldeck/context', 'fulldeck/role'], function(L, ctx, role) {
	var data = [
		{ name: 'Tony Taylor', position: 'Web Application Developer' },
		{ name: 'Jane Lane', position: 'User Experience Developer' },
		{ name: 'Marina James', position: 'Product Manager' }
	];

	var simpleScenario = ctx(function() {
		var self = this;

		var employeeAccess = role({
			'get-name': function() { return this.name; },
			'get-position': function() { return this.position; }
		});

			console.log(employeeAccess(L.first(self))['get-name']());
			console.log(employeeAccess(L.last(self))['get-position']());
	}, data);
});
