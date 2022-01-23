const request = require('supertest')
const app = require('../../app')
const { 
  mongoConnect, 
  mongoDisconnect 
} = require('../../services/mongo')


describe('Launches API', () => {

  beforeAll(async () => {
    console.log('Mongo starting at test')
    mongoClient = await mongoConnect()
    console.log('Mongo Connected!')
  })

  afterAll(async () => {
    console.log('Mongo closing at test')
    await mongoDisconnect()
    console.log('Mongo closed')
  })

  describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
      .get('/v1/launches')
      .expect('Content-Type', /json/)
      .expect(200);
    })
  })
  
  describe('Test POST /launches', () => {
  
    const completeLaunchDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-1410 b',
      launchDate: 'April 15, 2028'
    }
  
    const launchDataWithoutDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-1410 b',
    }
  
    const launchDataWithInvalidDate = {
      mission: 'USS Enterprise',
      rocket: 'NCC 1701-D',
      target: 'Kepler-186 f',
      launchDate: 'April 45, 2028'
    }
  
  
    test('It should respond with 201 created', async () => {
      const response = await request(app)
      .post('/v1/launches')
      .send(completeLaunchDate)
      .expect('Content-Type', /json/)
      .expect(201)
  
      const requestDate = new Date(completeLaunchDate.launchDate).valueOf()
      const responseDate = new Date(response.body.launchDate).valueOf()
      expect(responseDate).toBe(requestDate)
      expect(response.body).toMatchObject(launchDataWithoutDate)
    })
  
    test('It should catch  Missing required ${param} property', async () => {
      const response = await request(app)
        .post('/v1/launches')
        .send(launchDataWithoutDate)
        .expect('Content-Type', /json/)
        .expect(400)
  
      expect(response.body).toStrictEqual({
        error: `Missing required ${param} property`
      })
  
    })
  
    test('It should catch  Invalid Date', async () => {
      const response = await request(app)
      .post('/v1/launches')
      .send(launchDataWithInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400)
  
      expect(response.body).toStrictEqual({
        error: `Invalid Date`
      })
  
    })
  })

})

