import {
  dummyPaymentHandler,
  VendureConfig
} from "@vendure/core";
import fs from "fs";
import path from "path";
import { plugins } from './vendure-plugin-config'



export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    adminApiPlayground: {
      settings: { "request.credentials": "include" },
    },
    adminApiDebug: true,
    shopApiPlayground: {
      settings: { "request.credentials": "include" },
    },
    shopApiDebug: true,
  },
  authOptions: {
    cookieOptions: {
      secret: "jysakgzhw6",
    },
  },
  dbConnectionOptions: {
    type: "better-sqlite3",
    synchronize: false,
    logging: false,
    database: path.join(__dirname, "../vendure.sqlite"),
    migrations: [getMigrationsPath()],
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {},
  plugins,
};

function getMigrationsPath() {
  const devMigrationsPath = path.join(__dirname, "../migrations");
  const distMigrationsPath = path.join(__dirname, "migrations");

  return fs.existsSync(distMigrationsPath)
    ? path.join(distMigrationsPath, "*.js")
    : path.join(devMigrationsPath, "*.ts");
}
