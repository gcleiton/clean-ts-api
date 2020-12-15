import { SaveSurveyResultRepository, SurveyResultModel, SaveSurveyResultModel, SaveSurveyResult } from './db-save-survey-result-protocols.ts'

export class DbSaveSurveyResult implements SaveSurveyResult {
    constructor (private readonly saveSurveyResultRepository: SaveSurveyResultRepository) {}

    async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
        await this.saveSurveyResultRepository.save(data)
        return null
    }
}
