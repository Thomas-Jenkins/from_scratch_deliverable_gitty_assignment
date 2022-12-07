const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const { agent } = require('supertest');

describe('user routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  afterAll(() => {
    pool.end();
  });

  it('/api/v1/github/login should redirect to the github Oauth page', async () => {
    const res = await request(app).get('/api/v1/github/login');
    expect(res.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });
  it('/api/v1/github/callback should redirect the user to github/dashboard upon successful login in', async () => {
    const res = await (await agent(app).get('api/v1/github/callback')).redirect(1);
    expect(res.body).toEqual({
      id: expect.any(String),
      email: 'mockEmail@mocker.com',
      login: 'mockLogin',
      iat: expect.any(Number),
      exp: expect.any(Number)
    });
  });

});
