export type dbConfig = {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: string;
};

export const development: dbConfig;
export const test: dbConfig;
export const production: dbConfig;
export const allowedDomains: string[];
