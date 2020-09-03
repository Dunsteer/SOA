"use strict";

const DbMixin = require("../mixins/db-analytics.mixin");

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "analytics",

	/**
	 * Settings
	 */
	settings: {},

	/**
	 * Dependencies
	 */
	dependencies: [],

	mixins: [DbMixin("analytics")],

	/**
	 * Action Hooks
	 */
	hooks: {
		before: {
			/**
			 * Register a before hook for the `create` action.
			 * It sets a default value for the quantity field.
			 *
			 * @param {Context} ctx
			 */
			create(ctx) {
				ctx.params.quantity = 0;
			},
		},
	},

	/**
	 * Actions
	 */
	actions: {},

	/**
	 * Events
	 */
	events: {
		"analytics-data": {
			async handler(payload) {
				this.logger.info(payload.mag);

				if (parseFloat( payload.mag) > 4) {
					this.broker.emit("magnitude-alert", payload);
					this.adapter.insert(payload);
				}
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

	/**
	 * Fired after database connection establishing.
	 */
	async afterConnected() {},
};
