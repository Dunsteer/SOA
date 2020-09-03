[![Moleculer](https://badgen.net/badge/Powered%20by/Moleculer/0e83cd)](https://moleculer.services)

# earthquake-monitoring
This is a [Moleculer](https://moleculer.services/)-based microservices project. Generated with the [Moleculer CLI](https://moleculer.services/docs/0.14/moleculer-cli.html).

## Usage
Start the project with `npm run dev` command. 
After starting, open the http://localhost:3000/ URL in your browser. 
On the welcome page you can test the generated services via API Gateway and check the nodes & services.


## Services
- **api**: API Gateway services and also used for hosting a socket server.
- **data**: Service that saves data to DB and publishes data to `analytics-data` topic.
- **device**: Service that randomly publishes data to `new-data` topic, simulates sensor work. Also has routes for setting the interval of sampling.
- **command**: Service used to host all the commands for the actuators and start the when an alert happens.
- **analytics**: Service saves important data to DB and publishes them out if needed.

## NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run dc:up`: Start the stack with Docker Compose
- `npm run dc:down`: Stop the stack with Docker Compose
