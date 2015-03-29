/* globals define */
define([], function() {
	return function(enactor, exec_ctx) {
		var self = exec_ctx ? exec_ctx : null;
		return enactor.call(self);
	};
});
