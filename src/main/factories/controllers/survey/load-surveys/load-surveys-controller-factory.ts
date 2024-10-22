import { makeDbLoadSurveys } from '@/main/factories/usecases/survey/load-surveys/db-load-surveys-factory';
import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller';
import { Controller } from '@/presentation/protocols'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'

export const makeLoadSurveysController = (): Controller => {
    const controller = new LoadSurveysController(makeDbLoadSurveys())
    return makeLogControllerDecorator(controller)
}
