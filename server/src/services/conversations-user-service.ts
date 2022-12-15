import { FastifyJWTUser } from "@fastify/jwt";
import { FastifyInstance } from "fastify";

class ConversationUserService {
  public createUser(fastify: FastifyInstance, user: FastifyJWTUser) {}
}

export default ConversationUserService;
