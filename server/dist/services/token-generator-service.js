"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccessToken_1 = __importStar(require("twilio/lib/jwt/AccessToken"));
const config_1 = __importDefault(require("../config"));
const tokenGenerator = (identity) => {
    if (!identity)
        throw "No identity provide";
    const token = new AccessToken_1.default(config_1.default.TWILIO_ACCOUNT_SID, config_1.default.TWILIO_API_KEY, config_1.default.TWILIO_API_SECRET);
    token.identity = identity;
    if (config_1.default.TWILIO_CHAT_SERVICE_SID) {
        const chatGrant = new AccessToken_1.ChatGrant({
            serviceSid: config_1.default.TWILIO_CHAT_SERVICE_SID,
        });
        token.addGrant(chatGrant);
    }
    if (config_1.default.TWILIO_SYNC_SERVICE_SID) {
        const syncGrant = new AccessToken_1.SyncGrant({
            serviceSid: config_1.default.TWILIO_SYNC_SERVICE_SID || "default",
        });
        token.addGrant(syncGrant);
    }
    return {
        identity,
        token: token.toJwt(),
    };
};
exports.default = tokenGenerator;
