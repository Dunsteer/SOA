"use strict";
const fs = require("fs");
const csvParser = require("csv-parser");

const data = {};

/**
 * @typedef {import('moleculer').Context} Context Moleculer's Context
 */

module.exports = {
	name: "device",

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
		getDeviceSettings: {
			rest: {
				method: "GET",
				path: "/",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return this.settings.configObj;
			},
		},
		postDeviceSettings: {
			rest: {
				method: "POST",
				path: "/",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const reqData = ctx.params;

				this.settings.configObj.devices[reqData.deviceId] = { ...this.settings.configObj.devices[reqData.deviceId], ...reqData.settings };

				if(reqData.settings.interval){
					const deviceId = reqData.deviceId;

					clearInterval(this.settings.intervals[deviceId]);

					const device = this.settings.configObj.devices[reqData.deviceId];

    				this.settings.intervals[deviceId] = this.startInterval(device);
				}

				fs.writeFileSync("config.json", JSON.stringify(this.settings.configObj,undefined,2));
			},
		},
	},

	/**
	 * Events
	 */
	events: {
		"execute-command":{
			handler(payload){
				executeCommand(payload)
			}
		}
	},

	/**
	 * Methods
	 */
	methods: {
		executeCommand(payload) {

		},

		startInterval(device) {
			return setInterval(() => {
				this.readData(device);
			}, device.interval);
		},

		readData(device) {
			if (data.results) {
				const random = Math.round(Math.random() * data.results.length);

				const res = data.results[random];

				this.broker.emit("new-data", res);

				//return res;
			}
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		const config = fs.readFileSync("config.json");
		this.settings.configObj = JSON.parse(config);
		this.settings.intervals = [];

		const results = [];
		fs.createReadStream("all-month.csv")
			.pipe(csvParser())
			.on("data", (data) => results.push(data))
			.on("end", () => {
				data.results = results;
			});
	},

	/**
	 * Service started lifecycle event handler
	 */
	async started() {
		this.logger.info(data.a);

		for (let i = 0; i < this.settings.configObj.devices.length; i++) {
			const device = this.settings.configObj.devices[i];

			if (device.type == "sensor")
			this.settings.intervals[i] = this.startInterval(device);
		}
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		for (let i = 0; i < this.settings.configObj.devices.length; i++) {
			const device = this.settings.configObj.devices[i];

			if ((device.type = "sensor")) clearInterval(this.settings.intervals[i]);
		}
	},
};
