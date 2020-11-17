import { AccountMongoRepository } from './../../infra/db/mongodb/account-repository/account';
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { SignUpController } from './../../presentation/controllers/signup/signup';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';

export const makeSignUpController = (): SignUpController => {
    const emailValidatorAdapter = new EmailValidatorAdapter()

    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)

    return new SignUpController(emailValidatorAdapter, dbAddAccount)
}