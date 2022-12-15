import { FastifyPluginCallback } from "fastify";
import fp from "fastify-plugin";
import twilio from "twilio";

export interface TwilioInstanceOptions {
  accountSid: string;
  authToken: string;
}

const twilioInstance: FastifyPluginCallback<TwilioInstanceOptions> = (
  fastify,
  options,
  done
) => {
  const tw = twilio(options.accountSid, options.authToken);
  fastify.decorate("twilio", tw);
  done();
};


/**
 * fp is handling encapsulation and distribution
 * imagine like postgres pooling
 * 
 * note: i'm not sure are we really need 
 * to do this on twilio instance
 */
export default fp(twilioInstance);
