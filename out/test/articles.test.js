
const request = require('supertest')
const app = require ('./app.test')


describe( 'a simple api endpoint', () => {
  
  it('Get all article', async () => {
    const result = await request(app.callback()).get('/api/v1/articles')
    expect(result.statusCode).toEqual(200)
  })
  it('Post an article', async () => {
    const result = await request(app.callback()).post('/api/v1/articles')
        .set("Authorization", "Basic Ym9iOjY1NDMyMQ==")
        .send({
          "title": "Its Supertest",
          "alltext": "Learning testing stuff ",
          "authorid": 16});         
    expect(result.statusCode).toEqual(201);
  })
  })


