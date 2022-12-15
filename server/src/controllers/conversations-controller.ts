import { FastifyPluginCallback } from "fastify";
import ConversationUserService from "../services/conversations-user-service";

const conversationsController: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  const conversationsService = new ConversationUserService();

  fastify.get("/conversations/", (request, reply) => {
    conversationsService.createUser(fastify, request.user);
  });

  done();
};

export default conversationsController;
