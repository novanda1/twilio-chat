import cors from "@fastify/cors";
import * as dotenv from "dotenv";
import fastify from "fastify";
import tokenController from "./controllers/token-controller";

dotenv.config();

const server = fastify();

server.register(cors, {
  origin: "http://localhost:5173",
});

server.register(tokenController, { path: "/token" });

server.listen({ port: +(process.env.PORT || 3000) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
