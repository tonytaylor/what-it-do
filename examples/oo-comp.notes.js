
/**
 * with DCI, the application facade that used to look something like this:
 * 		facade.method(id1, id2, param1, param2)
 * 	is now replaced by:
 * 		context<id1, id2>.interaction(param1, param2)
 */


/**
 * A DCI Interaction is triggered by a message to a Context object.
 * The execution of an Interaction is as follows:
 *
 * 1.	A method in the sender object creates a message. This message
 * 		includes the sender object ID, the receiver object ID, the message
 * 		name and possible message arguments.
 *
 * 2.	The execution of the calling method is suspended.
 *
 * 3.	The VM adds an activation record on the top of the stack.
 *
 * 4.	The VM follows the class pointer in the receiver object to find
 * 		its message dictionary. Using the message name as a key, it looks 
 * 		up the corresponding method in the receiving object.  The lookup
 * 		is repeated along the superclass chain if necessary.  (A 
 * 		doesNotUnderand-exception is raised on failure).
 *
 * 		During the Interaction, messages to an object will be handled in a 
 * 		special way.  The object will execute instance methods in the 
 * 		context of the object's class in the usual way.  The object will
 * 		execute RoleMethods in the context of the CurrentContext. The method
 * 		lookup mechanism is as follows: The VM will first search the Role's
 * 		role methods for a match. If one is found, the object executes this
 * 		RoleMethod.  If not found, the search continues in the object's
 * 		class.
 *
 * 5.	The activation record is supplemented with a link to the selected 
 * 		method and a program counter for this method.
 *
 * 6.	The execution of the selected method is triggered and is performed
 * 		in the context of the receiving object.  A method may change the
 * 		object's state.  It can also send messages and the process is 
 * 		repeated from point 1.(above)
 *
 * 		There is a special case if the receiver is a Context and the
 * 		messages is a system operation.  The application programmer must
 * 		write the method for a system operation in a special way:
 *
 * 			a. the context object must be initialized with objects needed
 * 			   for the role/object mapping
 * 			b. the system operation method is written by the application 
 * 			   programmer.  It must call a base method that pushes the 
 * 			   Context onto the top of a globally available ContextStack.
 * 			   This receiver now becomes the CurrentContext. The base 
 * 			   method then sends a run-message to a designated Role, thus
 * 			   starting an Interaction.
 *			c. at the termination of the interaction, the CurrentContext is
 *			   popped off the Context stack and execution of the system
 *			   operation method continues in the normal manner.
 *
 * 7.	The activation record is removed from the stack upon method 
 * 		completion.  The execution of the calling method is resumed from
 * 		where it was suspended.
 */

/**
 * Three Constraints
 *
 * The coherent selection of roleplaying objects
 */

/**
 * Data storage is done in object's state variables..  An object's
 * apparent state can be derived, i.e., computed from other state.
 *
 * Data transformation is done in an object's methods.
 *
 * Data communication is done by message interaction in the context of a 
 * network of connected objects as identified by their roles
 */
