import { DataSource } from 'typeorm';

import { Task } from '@/entity/task';

export const AppDataSource = new DataSource({
  database: './main.sqlite',
  entities: [Task],
  logging: true,
  migrations: [],
  subscribers: [],
  synchronize: true,
  type: 'better-sqlite3',
});
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
