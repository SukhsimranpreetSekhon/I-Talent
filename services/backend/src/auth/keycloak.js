const redis = require("redis");
const KeycloakConnect = require("keycloak-connect");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const config = require("../config");

let redisClient = redis.createClient({
  host: config.REDIS_HOST,
  auth_pass: config.REDIS_PASSWORD,
});
const store = new RedisStore({ client: redisClient });

const keycloak = new KeycloakConnect(
  { store },
  {
    realm: "individual",
    "bearer-only": true,
    "auth-server-url": config.KEYCLOAK_AUTH_SERVER_URL,
    "ssl-required": "external",
    resource: config.KEYCLOAK_CLIENT_ID,
    "confidential-port": 0,
  }
);

const expiryDate = new Date(Date.now() + 60 * 60 * 1000);

const sessionInstance = session({
  name: config.SESSION_NAME,
  secret: config.KEYCLOAK_SECRET,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  store,
  cookie: {
    secure: config.ENV === "production",
    httpOnly: true,
    domain: config.COOKIE_DOMAIN,
    path: config.COOKIE_PATH,
    expires: expiryDate,
    sameSite: true,
  },
});

module.exports = { keycloak, sessionInstance };
