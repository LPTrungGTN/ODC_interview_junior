import dotenv from 'dotenv';
import { cleanEnv, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'production', 'testing'],
    devDefault: testOnly('testing'),
  }),
  PORT: port({ devDefault: testOnly(3000) }),
});
