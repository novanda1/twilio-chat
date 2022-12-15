import cors from "@fastify/cors";
import fastifyJwt from "@fastify/jwt";
import * as dotenv from "dotenv";
import fastify from "fastify";
import conversationsController from "./controllers/conversations-controller";
import tokenController from "./controllers/token-controller";
import twilioInstance from "./instances/twilio-instance";

dotenv.config();

const server = fastify();

server.register(cors, {
  origin: "http://localhost:5173",
});
server.register(fastifyJwt, {
  secret: "supersecret",
});

server.register(twilioInstance);
server.register(tokenController, { path: "/token" });
server.register(conversationsController);

server.listen({ port: +(process.env.PORT || 3000) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
