import { Twilio } from "twilio";

declare module "fastify" {
  interface FastifyInstance {
    twilio: Twilio;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWTUser {
    sub: string;
    role: "superadmin" | "admin" | "student" | "teacher";
  }
  interface FastifyJWT {
    user: FastifyJWTUser;
  }
}
