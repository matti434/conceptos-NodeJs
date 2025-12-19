import dotenv from 'dotenv';
dotenv.config();

import envvar from 'env-var';

const envs = {
  PORT: envvar.get('PORT').required().asPortNumber(),
  PUBLIC_PATH: envvar.get('PUBLIC_PATH').default('public').asString(),
};

export default envs;