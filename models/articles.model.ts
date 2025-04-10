import * as db from '../helpers/database';

export const getById = async (id: number) => {
  const query = "select * from articles where id = ?;";
  const values = [id];
  const data = await db.run_query(query, values);
  return data;
}

export const getAll = async () => {
  const query = "select * from articles;";
  const data = await db.run_query(query, null);
  return data;
}

export const add = async (article: Record<string, any>) => {
  const keys = Object.keys(article);
  const values = Object.values(article);
  const key = keys.join(',');
  const param = keys.map(() => '?').join(',');
  const query = `insert into articles(${key}) values (${param})`;
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    console.error("Error inserting article:", err);
    return { status: 500, error: err };
  }
}