/* jshint node:true */
/* global define */
define([
	'lodash', 'lemonad', '../role'
], function(_, L, Role) {
	return function(cfg) {
		function context(enactor) {
			if (L.existy(enactor) && L.isFunction(enactor)) {
				return function(val) {
					return enactor.call(context, val);
				};
			}
		}

		context.cfg = cfg;

		context.preconditions = [];

		context.postconditions = [];

		context.associate = function(roleName, obj) {
			var cfg = this.cfg;

			if (L.falsey(cfg.roles) || L.falsey(cfg.roles[roleName])) {
				L.fail('could not find entry for ' + roleName);
			}
			
			return Role(cfg.roles[roleName])(obj);
		};

		context.disassociate = function(roleName, obj) {
			var cfg = this.cfg;

			if (L.falsey(cfg.roles) || L.falsey(cfg.roles[roleName])) {
				L.fail('could not find entry for ' + roleName);
			}

			return _.omit(obj, _.keys(cfg.roles[roleName]));
		};

		return context;
	};
});
