/* globals define */
define([
	'lemonad', './context/simple', './context/robust'
], function(L, simple, robust) {
	/**
	 * Context is the 'run-time' manager of a use case enactment.
	 */
	var msg = [
		'A context requires either:\n',
		'\t -> A function for enacting the context, OR\n',
		'\t -> A configuration object containing the following:\n',
		'\t\t -> normal flow enactor <required>\n',
		'\t\t -> actors\n',
		'\t\t -> roles\n',
		'\t\t -> preconditions\n',
		'\t\t -> postconditions\n',
		'\t\t -> alternate flow enactors\n'
	].join('');

	return function(/* args */) {
		var args = L.toArray(arguments);

		if (args.length >= 2 && L.isFunction(L.first(args))) {
			// return simple context
			return simple(L.first(args), L.nth(1, args));
		} else if (args.length === 1 && L.isObject(L.first(args))) {
			// return robust context
			return robust(L.first(args));
		} else {
			L.fail(msg);
		}
	};
});
