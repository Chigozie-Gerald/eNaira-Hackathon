require("dotenv").config({ override: true });

const isProduction = (mode) => mode === `Production`;

const allowedDomains = isProduction(process.env.NODE_ENV)
  ? [process.env.REMOTE_CLIENT_URL, process.env.REMOTE_SERVER_URL]
  : [process.env.LOCAL_CLIENT_URL, process.env.LOCAL_SERVER_URL];

const development = {
  username: "root",
  password: "7890",
  database: "eNaira_development_local",
  host: "127.0.0.1",
  dialect: "mysql",
};

const test = {
  username: "root",
  password: null,
  database: "eNaira_local_test",
  host: "127.0.0.1",
  dialect: "mysql",
};

const production = {
  username: process.env.MYSQL_PRODUCTION_USERNAME,
  password: process.env.MYSQL_PRODUCTION_PASSWORD,
  database: process.env.MYSQL_PRODUCTION_DATABASE,
  host: process.env.MYSQL_PRODUCTION_PORT,
  dialect: "mysql",
};

module.exports = {
  development,
  test,
  production,
  allowedDomains,
};
