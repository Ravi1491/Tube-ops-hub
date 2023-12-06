import { DataSource } from 'typeorm';
import { applicationConfig } from './index';

export default new DataSource({
  type: 'postgres',
  host: applicationConfig.db.host,
  port: parseInt(applicationConfig.db.port || '5432'),
  username: applicationConfig.db.user,
  password: applicationConfig.db.password,
  database: applicationConfig.db.name,
  entities: ['src/**/**/*.entity.{js,ts}'],
  migrations: ['seeders/*{.ts,.js}'],
});
