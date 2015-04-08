/* jshint node:true */
var r = require('requirejs');

r.config({ nodeRequire: require, paths: { 'deck': '../lib' } });

r(['lemonad', 'deck/context', 'deck/role'], function(L, ctx, role) {
	var x = [
		{ name: 'Tony Taylor', title: 'Web Application Developer' },
		{ name: 'Jane Lane', title: 'User Experience Developer' },
		{ name: 'Marina James', title: 'Product Manager' }
	];

	var simpleScenario = ctx(function() {
		var self = this;

		var employeeRecord = role({
			'getName': function() { return this.name; },
            'getTitle': function() { return this.title; }
		});

        console.log(employeeRecord(L.first(self.data)).getName());
        console.log(employeeRecord(L.last(self.data)).getTitle());

        return function() {
            console.log('%o', L.toArray(arguments));
            console.log('perform extra stuff here. . .');
        };
	}, {data: x});

    var = simpleScenario('hello?');
});
