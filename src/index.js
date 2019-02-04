const { resolveFromVersion } = require('./server/utils/resolve.utils');
const winston = require('./server/winston.js');
const Server = require('./server/server');
const constants = require('./constants');

/**
 * @name exports
 * @description Export the server and some convenience methods for building a FHIR server
 */
module.exports = {
	/**
	 * @description Export constants so users can have access to these
	 */
	constants: constants,

	/**
	 * @description Export the server class so someone can build it themselves. This gives them
	 * much greater flexibility on ordering things and adding their own components/middleware to
	 * the server. When using this method, the user should consult the documentation and use all the same
	 * setup methods the default implementation uses.
	 */
	Server: Server,

	/**
	 * @description Export function to support easier loading of classes
	 */
	resolveFromVersion: resolveFromVersion,

	/**
	 * @description Export logger to allow for customization and easy access to
	 * various loggers
	 */
	loggers: winston,

	/**
	 * @description Initialize is useful for building a server with all the defaults
	 * @param {Object} config - FHIR Server configuration object
	 * @return {Server}
	 */
	initialize: config =>
		new Server(config)
			.configureMiddleware()
			.configureSession()
			.configureHelmet()
			.configurePassport()
			.setPublicDirectory()
			.setProfileRoutes()
			.setErrorRoutes(),
};
