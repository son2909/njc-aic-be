import dotenv from 'dotenv';
import path from 'path';

const { NODE_ENV } = process.env;
const envFile = NODE_ENV ? `.env.${NODE_ENV}` : `.env.development`;
const envPath = path.resolve(__dirname, `../../${envFile}`);

dotenv.config({
  path: envPath,
});
