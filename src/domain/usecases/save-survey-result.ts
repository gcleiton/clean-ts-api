import { SurveyResultModel } from '@/domain/models/survey-result'

export type SaveSurveyResultModel = Omit<SaveSurveyResult, 'id'>

export type SaveSurveyResult = {
    save (data: SaveSurveyResultModel): Promise<SurveyResultModel>
}
