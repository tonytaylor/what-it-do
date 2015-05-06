/* jshint node:true */
/* global define */
define([
	'lodash', 'lemonad', 'fulldeck/role', 'fulldeck/constants'
], function(_, L, Role, Constants) {


	return function(cfg) {

		function ctx() { 
			// we need a better implementation than this!
			cfg.init.apply(ctx, _.toArray(arguments)); 
			return ctx;
		}

		if (!cfg.roleMethods) ctx.error(Constants.CTX.NOROLES);

		if (!cfg.init) ctx.error(Constants.CTX.NOINITFN);

		ctx.error = L.fail;

		ctx.roles = {};

		ctx.bindRolesToContext = function(mappings) {
			this.roles = this.associate(mappings);
		};

		ctx.associate = function(mappings) {
			var me          = this,
				roleMethods = cfg.roleMethods,
				roles       = Object.keys(mappings);

			if (roles.length < 1) me.error('no roles defined!');

			return roles.reduce(function(prev, curr) {
				prev[curr] = Role(roleMethods[curr])(mappings[curr]);
				if (!prev[curr]) me.error(Constants.CTX.NOROLEMETHOD);
				return prev;
			}, {});
		};

		return ctx;
	};
});
