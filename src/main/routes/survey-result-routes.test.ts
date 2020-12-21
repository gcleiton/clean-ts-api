import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
        name: 'Gabriel Cleiton',
        email: 'ccgabrielcc2609@gmail.com',
        password: '123',
    })
    const id = res.ops[0]._id
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({
        _id: id
    }, {
        $set: {
            accessToken
        }
    })

    return accessToken
}

describe('Survey Routes', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
        accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    describe('PUT /surveys/:surveyId/results', () => {
        test('Should return 403 on save survey without accessToken', async () => {
            await request(app)
                .put('/api/surveys/any_id/results')
                .send({
                    answer: 'any_answer'
                })
                .expect(403)
        })

        test('Should return 200 on save survey result with accessToken', async () => {
            const accessToken = await makeAccessToken()
            const res = await surveyCollection.insertOne({
                question: 'Question',
                answers: [{
                    answer: 'Answer 1',
                    image: 'http://image-name.com'
                }, {
                    answer: 'Answer 2'
                }]
            })
            await request(app)
                .put(`/api/surveys/${res.ops[0]._id}/results`)
                .set('x-access-token', accessToken)
                .send({
                    answer: 'Answer 1'
                })
                .expect(200)
        })
    })
})
