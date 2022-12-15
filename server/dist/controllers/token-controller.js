"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const token_generator_service_1 = __importDefault(require("../services/token-generator-service"));
const tokenController = (server, { path }, done) => {
    server.get(`${path}/`, (request) => {
        return server.twilio;
    });
    server.get(`${path}/:id`, (request) => {
        var _a;
        const id = (_a = request.params) === null || _a === void 0 ? void 0 : _a.id;
        if (!id)
            return "no id";
        const token = (0, token_generator_service_1.default)(id);
        return token;
    });
    done();
};
exports.default = tokenController;
