# gRPC in 3 minutes (C#)

## BACKGROUND

This is a version of the helloworld example using the dotnet SDK
tools to compile `helloworld.proto` in a common library, build the server
and the client, and run them.

## PREREQUISITES

- The [.NET Core SDK 2.1+](https://www.microsoft.com/net/core)

You can also build the solution `Greeter.sln` using Visual Studio 2017,
but it's not a requirement.

## BUILD AND RUN

- Build and run the server

  ```
  > dotnet run -p GreeterServer
  ```

- Build and run the client

  ```
  > dotnet run -p GreeterClient
  ```

## Tutorial

You can find a more detailed tutorial about gRPC in `gRPC Basics: C#`

[grpc basics: c#]: https://grpc.io/docs/tutorials/basic/csharp.html

# Earthquake monitoring

This app simulates an earthquake response using a microservice architecture.

It consists of a backend app (see folder `eartqake-monitoring`) written using the moleculer framework and admin panel (see folder `client-app`) written in angular 

## Moleculer

### Usage
Start the project in dev mode with `npm run dev` command. 
After starting, open the http://localhost:3000/ URL in your browser. 
On the welcome page you can test the generated services via API Gateway and check the nodes & services.


### Services
- **api**: API Gateway services and also used for hosting a socket server.
- **data**: Service that saves data to DB and publishes data to `analytics-data` topic.
- **device**: Service that randomly publishes data to `new-data` topic, simulates sensor work. Also has routes for setting the interval of sampling.
- **command**: Service used to host all the commands for the actuators and start the when an alert happens.
- **analytics**: Service saves important data to DB and publishes them out if needed.

### NPM scripts

- `npm run dev`: Start development mode (load all services locally with hot-reload & REPL)
- `npm run dc:up`: Start the stack with Docker Compose and also starts the angular client
- `npm run dc:down`: Stop the stack with Docker Compose

## Angular

### Usage

**Start the moleculer backend first**

Start the project in dev mode with `npm start` command.
After starting, open the http://localhost:4200/ URL in your browser. 