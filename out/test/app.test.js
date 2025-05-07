const Koa = require('koa')
const app = new Koa()
const special = require('../routes/specials')
const articles = require('../routes/articles')
// const user = require('../routes/users')
app.use(special.router.routes())
app.use(articles.router.routes())
module.exports = app
