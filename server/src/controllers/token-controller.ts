import { FastifyPluginCallback } from "fastify";
import tokenGenerator from "../services/token-generator-service";

const tokenController: FastifyPluginCallback<{ path: string }> = (
  server,
  { path },
  done
) => {
  server.get(`${path}/:id`, (request) => {
    const id = (request.params as { id: "string" })?.id;
    if (!id) return "no id";
    const token = tokenGenerator(id);
    return token;
  });

  done();
};

export default tokenController;
