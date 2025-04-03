import passport from "koa-passport";
import { BasicStrategy } from "passport-http";
import { RouterContext } from "koa-router";
import * as users from '../models/users';

interface User {
  username: string;
  password: string;
  // 添加其他用户属性
}

const verifyPassword = (user: User, password: string): boolean => {
  return user.password === password;
}

passport.use(new BasicStrategy(async (username, password, done) => {
  try {
    const result = await users.findByUsername(username);
    if (result.length) {
      const user = result[0];
      if (verifyPassword(user, password)) {
        return done(null, { user });
      } else {
        console.log(`Password incorrect for ${username}`);
        return done(null, false);
      }
    } else {
      console.log(`No such user ${username}`);
      return done(null, false);
    }
  } catch (error) {
    console.error(`Error during authentication for user ${username}: ${error}`);
    return done(null, false);
  }
}));

export const basicAuth = async (ctx: RouterContext, next: any) => {
  await passport.authenticate("basic", { session: false })(ctx, next);
  if (ctx.status === 401) {
    ctx.body = { message: 'You are not authorized' };
  }
}