module.exports = {
  DBConnectors: {
    host: process.env.DB_HOST || "db4free.net",
    port: process.env.DB_PORT || 3306,
    username: process.env.DB_USER || "someguy46",
    password: process.env.DB_PASSWORD || "ny9tgxj1xd55ywcejmg5",
    database: process.env.DB_NAME || "api_test",
    dialect: process.env.DB_DIALECT || "mysql",
  },
  jwtAuthKey: "abcxyz",
  tokenLoginExpiredDays: "25 days",
};
