import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/articles";

const router = new Router({ prefix: '/api/v1/articles' });

const getAll = async (ctx: RouterContext, next: any) => {
  const articles = await model.getAll();
  ctx.body = articles.length ? articles : {};
  await next();
};

const createArticle = async (ctx: RouterContext, next: any) => {
  const { status, ...body } = ctx.request.body;
  const result = await model.add(body);
  
  if (result.status === 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "insert data failed" };
  }
  await next();
};

const getById = async (ctx: RouterContext, next: any) => {
  const id = +ctx.params.id;
  const [article] = await model.getById(id);
  
  if (article) {
    ctx.body = article;
  } else {
    ctx.status = 404;
  }
  await next();
};

const updateArticle = async (ctx: RouterContext, next: any) => {
  const id = +ctx.params.id;
  const articleData = ctx.request.body;
  const result = await model.update(articleData, id);
  
  if (result) {
    ctx.status = 201;
    ctx.body = `Article with id ${id} updated`;
  }
  await next();
};

const deleteArticle = async (ctx: RouterContext, next: any) => {
  const id = +ctx.params.id;
  await model.deleteById(id);
  ctx.status = 201;
  ctx.body = `Article with id ${id} deleted`;
  await next();
};

router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(), updateArticle);
router.delete('/:id([0-9]{1,})', deleteArticle);

export { router };