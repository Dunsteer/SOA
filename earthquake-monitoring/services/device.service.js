"use strict";
const fs = require("fs");
const csvParser = require("csv-parser");

const data = {};

const deviceConfig = "device.config.json";

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
				path: "/settings",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				return {"rows":this.settings.configObj.devices,"total":this.settings.configObj.devices.length};
			},
		},
		postDeviceSettings: {
			rest: {
				method: "POST",
				path: "/settings",
			},
			/** @param {Context} ctx  */
			async handler(ctx) {
				const reqData = ctx.params;

				const devices = this.settings.configObj.devices.filter(
					(x) => x.id == reqData.deviceId
				);

				if (devices.length == 0) return "Device not found";

				const device = devices.pop();

				if (device.type == "sensor") {
					device.interval = reqData.settings.interval;

					if (reqData.settings.interval) {
						clearInterval(this.settings.intervals[device.id]);

						this.settings.intervals[device.id] = this.startInterval(
							device
						);
					}
				}

				if (device.type == "actuator") {
					const commands = device.commands.filter(
						(x) => (x.comm == reqData.comm)
					);
					let command;
					if (commands.length == 0) {
						console.log("ovde");
						command = {
							comm: reqData.comm,
							params: reqData.params,
						};

						device.commands.push(command);
					} else {
						command = commands.pop();
						command.params = reqData.params;
					}
				}

				const actuators = this.settings.configObj.devices.filter(
					(x) => x.type == "actuator"
				);

				ctx.emit("commands-changed", actuators);

				fs.writeFileSync(
					deviceConfig,
					JSON.stringify(this.settings.configObj, undefined, 2)
				);
			},
		},
	},

	/**
	 * Events
	 */
	events: {
		"execute-command": {
			handler(payload) {
				this.executeCommand(payload);
			},
		},
	},

	/**
	 * Methods
	 */
	methods: {
		executeCommand(payload) {
			for(let element of this.settings.configObj.devices){
				if(element.type == "actuator"){
					let contains = false;
					for(let command of element.commands){
						if(command.comm.includes(payload.comm)){
							contains = true;
							break;
						}
					}
					if(contains){
						this.logger.info(`${payload.comm} executed on device ${element.id}`);
					}
				}
			}
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
			}
		},
	},

	/**
	 * Service created lifecycle event handler
	 */
	created() {
		const config = fs.readFileSync(deviceConfig);
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
				this.settings.intervals[device.id] = this.startInterval(device);
		}
	},

	/**
	 * Service stopped lifecycle event handler
	 */
	async stopped() {
		for (let interval of this.settings.intervals) {
			if (interval) {
				clearInterval(interval);
			}
		}
	},
};
