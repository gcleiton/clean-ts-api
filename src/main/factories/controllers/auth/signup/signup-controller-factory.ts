import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { SignUpController } from '../../../../../presentation/controllers/auth/signup/signup-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeDbAuthentication } from '../../../usecases/account/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../../usecases/account/add-account/db-add-account-factory'

export const makeSignUpController = (): Controller => {
    const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
    return makeLogControllerDecorator(signUpController)
}
