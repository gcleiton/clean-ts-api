import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { hash } from 'bcrypt'

let accountCollection: Collection

describe('Login Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async () => {
        accountCollection = await MongoHelper.getCollection('accounts')
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
            await request(app)
                .post('/api/signup')
                .send({
                    name: 'Gabriel Cleiton',
                    email: 'ccgabrielcc2609@gmail.com',
                    password: '12345',
                    passwordConfirmation: '12345'
                })
                .expect(403)
        })
    })

    describe('POST /login', () => { 
        test('Should return 200 on login', async () => {
            const password = await hash('123', 12)
            await accountCollection.insertOne({
                name: 'Gabriel Cleiton',
                email: 'ccgabrielcc2609@gmail.com',
                password
            })
            await request(app)
                .post('/api/login')
                .send({
                    email: 'ccgabrielcc2609@gmail.com',
                    password: '123'
                })
                .expect(200)
        })

        test('Should return 401 on login', async () => {
            await request(app)
                .post('/api/login')
                .send({
                    email: 'ccgabrielcc2609@gmail.com',
                    password: '123'
                })
                .expect(401)
        })
    })
})