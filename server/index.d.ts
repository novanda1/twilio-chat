import { Twilio } from "twilio";

declare module "fastify" {
  interface FastifyInstance {
    twilio: Twilio;
  }
}
