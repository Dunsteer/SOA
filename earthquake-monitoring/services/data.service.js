"use strict";

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name:"data",

	/**
	 * Settings
	 */
	settings: {

	},

	/**
	 * Dependencies
	 */
	dependencies: [],

	/**
	 * Actions
	 */
	actions: {
		getDeviceSettings:{
			rest:{
				method:"GET",
				path:"/",
			},
			/** @param {Context} ctx  */
			async handler(ctx){
				return "test";
			}
		}
	},

	/**
	 * Events
	 */
	events: {
		"new-data":{
			handler(payload){
				this.logger.info(payload);
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {},

	/**
	 * Service created lifecycle event handler
	 */
	created() {

	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {},
}
