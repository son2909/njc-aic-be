export default (): Record<string, any> => ({
  databaseConnection: process.env.DATABASE_CONNECTION || 'mysql',
  databaseHost: process.env.DATABASE_HOST,
  databasePort: parseInt(process.env.DATABASE_PORT) || 3306,
  databaseUsername: process.env.DATABASE_USER,
  databasePassword: process.env.DATABASE_PASSWORD,
  databaseName: process.env.DATABASE_DB,
  max: parseInt(process.env.DB_POOL_MAX),
  min: parseInt(process.env.DB_POOL_MIN),
  idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT),
});
