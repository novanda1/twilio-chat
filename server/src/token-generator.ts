import AccessToken, { ChatGrant, SyncGrant } from "twilio/lib/jwt/AccessToken";
import config from "./config";

const tokenGenerator = (identity: string) => {
  if (!identity) throw "No identity provide";

  const token = new AccessToken(
    config.TWILIO_ACCOUNT_SID!,
    config.TWILIO_API_KEY!,
    config.TWILIO_API_SECRET!
  );

  token.identity = identity;

  if (config.TWILIO_CHAT_SERVICE_SID) {
    const chatGrant = new ChatGrant({
      serviceSid: config.TWILIO_CHAT_SERVICE_SID,
    });

    token.addGrant(chatGrant);
  }

  if (config.TWILIO_SYNC_SERVICE_SID) {
    const syncGrant = new SyncGrant({
      serviceSid: config.TWILIO_SYNC_SERVICE_SID || "default",
    });
    token.addGrant(syncGrant);
  }

  return {
    identity,
    token: token.toJwt(),
  };
};

export default tokenGenerator;
