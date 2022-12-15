"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const twilio_1 = __importDefault(require("twilio"));
const twilioInstance = (fastify, options, done) => {
    const tw = (0, twilio_1.default)(options.accountSid, options.authToken);
    fastify.decorate("twilio", tw);
    done();
};
// fp is handling encapsulation and distribution
exports.default = (0, fastify_plugin_1.default)(twilioInstance);
