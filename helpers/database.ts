
import { Sequelize, QueryTypes } from 'sequelize';
import { config } from '../config';

const getSequelize = () => new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);

const handleDatabaseOperation = async (operation: () => Promise<any>, errorMessage: string, query?: string, values?: any) => {
  const sequelize = getSequelize();
  try {
    await sequelize.authenticate();
    const result = await operation();
    return result;
  } catch (err: any) {
    console.error(err, query, values);
    throw errorMessage;
  } finally {
    await sequelize.close();
  }
};

export const run_query = async (query: string, values: any) => 
  handleDatabaseOperation(
    () => sequelize.query(query, { replacements: values, type: QueryTypes.SELECT }),
    'Database query error',
    query,
    values
  );

export const run_insert = async (sql: string, values: any) => 
  handleDatabaseOperation(
    () => sequelize.query(sql, { replacements: values, type: QueryTypes.INSERT }),
    'Database insert error',
    sql,
    values
  );