export default (): Record<string, any> => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  bcryptSalt: parseInt(process.env.BCRYPT_SALT, 10) || 10,
  minPasswordLength: 8,
  maxPasswordLength: 24,
  apiPrefix: process.env.API_PREFIX,
  throttleTtl: process.env.THROTTLE_TTL,
  throttleLimit: process.env.THROTTLE_LIMIT,
  SERVICE_TWILIO_KEY_SID: process.env.SERVICE_TWILIO_KEY_SID,
  SERVICE_TWILIO_KEY_SECRET: process.env.SERVICE_TWILIO_KEY_SECRET,
  functionInvokeKey: {
    process_import: 'import-uke-proccess',
    process_export_zip: 'export-zip-proccess',
  },
});
