import { makeDbAddSurvey } from '../../../usecases/survey/add-survey/db-add-survey-factory';
import { Controller } from '@/presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'

export const makeAddSurveyController = (): Controller => {
    const surveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
    return makeLogControllerDecorator(surveyController)
}
