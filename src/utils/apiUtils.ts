import log from "loglevel";

const devConfigs = require("../configs/api.dev.json");
const prodConfigs = require("../configs/api.prod.json");

let apiConfigs = null;

if (process.env.NODE_ENV === "development") {
  apiConfigs = devConfigs.api;
} else if (process.env.NODE_ENV === "production") {
  apiConfigs = prodConfigs.api;
} else {
  log.error("Unknown NODE_ENV: ", process.env.NODE_ENV);
}

const { protocol, ip, port, prefix } = apiConfigs;

export const BASE_URL = `${protocol}://${ip}:${port}${prefix}`;
