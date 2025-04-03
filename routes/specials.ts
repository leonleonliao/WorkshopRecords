import Router, { RouterContext } from "koa-router";
import { basicAuth } from '../controllers/auth';

const router = new Router({ prefix: '/api/v1' });

router.get("/private", basicAuth, privateAPI);

function privateAPI(ctx: RouterContext, next: any) {
  const user = ctx.state.user;
  if (user && user.user) {
    ctx.body = { message: `Hello ${user.user.username}, you registered on ${user.user.dateregistered}` };
  } else {
    ctx.status = 401;
    ctx.body = { err: "Unauthorized access" };
  }
}

export { router };