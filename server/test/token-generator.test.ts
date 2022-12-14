import tokenGenerator from "../src/services/token-generator-service";
const jwt = require("jsonwebtoken");

describe("#tokenGenerator", () => {
  it("generates a new token", () => {
    const token = tokenGenerator("test");
    const decoded = jwt.decode(token.token, { complete: true });

    expect(decoded).toHaveProperty("payload.grants.identity", token.identity);
    expect(decoded).toHaveProperty("payload.grants.chat.service_sid");
    expect(decoded).toHaveProperty("payload.grants.data_sync.service_sid");
  });

  it("generates a new token using the specified identity", () => {
    const identity = "Alice";
    const token = tokenGenerator(identity);
    const decoded = jwt.decode(token.token, { complete: true });

    expect(token.identity).toEqual(identity);
    expect(decoded).toHaveProperty("payload.grants.identity", token.identity);
  });
});
