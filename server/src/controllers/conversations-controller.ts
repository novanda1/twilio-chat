import { FastifyPluginCallback } from "fastify";

const conversationsController: FastifyPluginCallback = (
  fastify,
  options,
  done
) => {
  fastify.get("/conversations/", (request, reply) => {
    reply.code(200).send(request.user);
  });

  done();
};

export default conversationsController;
