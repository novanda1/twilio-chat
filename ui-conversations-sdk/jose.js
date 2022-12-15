import * as jose from "jose";

const secret = new TextEncoder().encode("supersecret");
const alg = "HS256";

const jwt = await new jose.SignJWT({ name: "novanda" })
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setExpirationTime("2h")
  .sign(secret);

console.log(jwt);
