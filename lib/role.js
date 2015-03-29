/* globals define */
define([
	'lemonad',
	'lodash'
], function(L, _) {
	'use strict';
	return function(cfg) {
		if (!cfg || !L.isObject(cfg)) {
			L.fail('An object is required to create a role');
		} else if (L.len(cfg) < 1) {
			L.fail('At least 1 method is required for a role');
		}

		function role(actor) {
			if (L.len(actor) < 1) L.fail('no empty actors!');
			return L.mix(actor, cfg);
		}

		/* deprecated */
		role.unassign = function(actor) {
			return _.omit(actor, _.keys(cfg));
		};

		return role;
	};
});
