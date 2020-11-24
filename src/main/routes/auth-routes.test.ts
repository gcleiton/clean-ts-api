import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Login Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async () => {
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    describe('POST /signup', () => { 
        test('Should return 200 on success', async () => {
            await request(app)
                .post('/api/signup')
                .send({
                    name: 'Gabriel Cleiton',
                    email: 'ccgabrielcc2609@gmail.com',
                    password: '12345',
                    passwordConfirmation: '12345'
                })
                .expect(200)
        })
    })
})