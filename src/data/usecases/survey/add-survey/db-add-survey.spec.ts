import { DbAddSurvey } from './db-add-survey'
import { AddSurveyParams, AddSurveyRepository } from './db-add-survey-protocols'
import MockDate from 'mockdate'
import { mockAddSurveyRepository } from '@/data/test'
import { throwError, mockAddSurveyParams } from '@/domain/test'

type SutTypes = {
    sut: DbAddSurvey
    addSurveyRepositoryStub: AddSurveyRepository
}

const makeSut = (): SutTypes => {
    const addSurveyRepositoryStub = mockAddSurveyRepository()
    const sut = new DbAddSurvey(addSurveyRepositoryStub)
    return {
        sut, addSurveyRepositoryStub
    }
}

describe('DbAddSurvey UseCase', () => {
    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call AddSurveyRepository with correct values', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addSurveyRepositoryStub, 'add')
        const surveyData = mockAddSurveyParams()
        await sut.add(surveyData)
        expect(addSpy).toHaveBeenCalledWith(surveyData)
    })

    test('Should throw if AddSurveyRepository throws', async () => {
        const { sut, addSurveyRepositoryStub } = makeSut()
        jest.spyOn(addSurveyRepositoryStub, 'add').mockImplementationOnce(throwError)
        const promise = sut.add(mockAddSurveyParams())
        await expect(promise).rejects.toThrow()
    })
})
