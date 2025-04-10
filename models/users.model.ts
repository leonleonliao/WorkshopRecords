import * as db from "../helpers/database";

export const findByUsername = async (username: string) => {
  const query = "select * from users where username = ?";
  try {
    const user = await db.run_query(query, [username]);
    return user;
  } catch (err: any) {
    console.error("Error finding user by username:", err);
    throw new Error("Database query error");
  }
};
