import { MissingParamError } from './../../errors/missing-param-error';
import { badRequest, serverError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'
import { InvalidParamError } from '../../errors'

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator

    constructor(emailValidator: EmailValidator) {
        this.emailValidator = emailValidator
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const { email, password } = httpRequest.body
            if (!email) {
                return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
            }

            if (!password) {
                return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
            }

            const isValid = this.emailValidator.isValid(email)
            if (!isValid) {
                return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
            }
        } catch (error) {
            return serverError(error)
        }
    }
}
