import { FastifyInstance } from "fastify";
import { RoleInstance } from "twilio/lib/rest/conversations/v1/role";
import { ConversationScropePermission } from "../types/conversations-role-permission";

/**
 * @todo 
 * - Do we need to check if roles already exists before create.
 * - Add remaing roles
 */
class ConversationsRoleServices {
  public async createStudentRole(
    fastify: FastifyInstance
  ): Promise<RoleInstance> {
    return await fastify.twilio.conversations.v1.roles.create({
      type: "conversation",
      permission: [ConversationScropePermission.SendMessage],
      friendlyName: "student",
    });
  }

  public async createTeacherRole(
    fastify: FastifyInstance
  ): Promise<RoleInstance> {
    return await fastify.twilio.conversations.v1.roles.create({
      type: "conversation",
      permission: [ConversationScropePermission.SendMessage],
      friendlyName: "teacher",
    });
  }

  public init(fastify: FastifyInstance) {
    this.createStudentRole(fastify);
    this.createTeacherRole(fastify);
  }
}

export default ConversationsRoleServices;
