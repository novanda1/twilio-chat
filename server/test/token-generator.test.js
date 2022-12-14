"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_generator_1 = __importDefault(require("../src/token-generator"));
const jwt = require("jsonwebtoken");
describe("#tokenGenerator", () => {
    it("generates a new token", () => {
        const token = (0, token_generator_1.default)("test");
        const decoded = jwt.decode(token.token, { complete: true });
        expect(decoded).toHaveProperty("payload.grants.identity", token.identity);
        expect(decoded).toHaveProperty("payload.grants.chat.service_sid");
        expect(decoded).toHaveProperty("payload.grants.data_sync.service_sid");
    });
    it("generates a new token using the specified identity", () => {
        const identity = "Alice";
        const token = (0, token_generator_1.default)(identity);
        const decoded = jwt.decode(token.token, { complete: true });
        expect(token.identity).toEqual(identity);
        expect(decoded).toHaveProperty("payload.grants.identity", token.identity);
    });
});
