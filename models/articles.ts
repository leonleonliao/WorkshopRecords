import * as db from '../helpers/database';

export const getById = async (id: any) => {
  const query = 'SELECT * FROM articles WHERE ID = ?';
  const values = [id];
  return await db.run_query(query, values);
};

export const getAll = async () => {
  const query = 'SELECT * FROM articles';
  return await db.run_query(query, null);
};

export const add = async (article: any) => {
  const keys = Object.keys(article).join(',');
  const values = Object.values(article);
  const params = values.map(() => '?').join(',');
  const query = `INSERT INTO articles (${keys}) VALUES (${params})`;
  
  try {
    await db.run_insert(query, values);
    return { status: 201 };
  } catch (err: any) {
    return err;
  }
};

export const update = async (article: any, id: any) => {
  const updates = Object.entries(article)
    .map(([key, value]) => `${key}='${value}'`)
    .join(',');
  const query = `UPDATE articles SET ${updates} WHERE ID=${id} RETURNING *;`;
  
  try {
    await db.run_query(query, Object.values(article));
    return { status: 201 };
  } catch (error) {
    return error;
  }
};

export const deleteById = async (id: any) => {
  const query = "DELETE FROM articles WHERE ID = ?";
  const values = [id];
  return await db.run_query(query, values);
};