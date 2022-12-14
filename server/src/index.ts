import fastify from "fastify";
import * as dotenv from "dotenv";
import tokenGenerator from "./token-generator";
import cors from "@fastify/cors";

dotenv.config();

const server = fastify();
server.register(cors, {
  origin: "http://localhost:5173",
});

// @todo use jwt to get id
server.get("/token/:id", (request) => {
  const id = (request.params as { id: "string" })?.id;
  if (!id) return "no id";

  const token = tokenGenerator(id);

  return token;
});

server.listen({ port: +(process.env.PORT || 3000) }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
