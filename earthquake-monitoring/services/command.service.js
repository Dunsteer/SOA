"use strict";

const fs = require("fs");

const commandsConfig = "command.config.json";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "command",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		get: {
			rest: {
				method: "GET",
				path: "/",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const config = fs.readFileSync(commandsConfig);
				const actuators = JSON.parse(config);
				const commands = actuators.map(x=>x.commands).flat();
				return commands;
			},
		},
	},

	// ctx.emit("commands-changed", actuators);

	// 			fs.writeFileSync(
	// 				deviceConfig,
	// 				JSON.stringify(this.settings.configObj, undefined, 2)
	// 			);

	/**
	 * Events
	 */
	events: {
		"commands-changed": {
			handler(payload) {
				fs.writeFileSync(
					commandsConfig,
					JSON.stringify(payload, undefined, 2)
				);
			},
		},
		"magnitude-alert": {
			async handler(payload) {
				this.broker.emit("execute-command", {
					comm: "ring",
					time: 1000,
				});
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
};
