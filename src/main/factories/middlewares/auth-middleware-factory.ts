import { makeDbLoadAccountByToken } from './../usecases/load-account-by-token/db-load-account-by-token-factory';
import { Middleware } from '../../../../../presentation/protocols'
import { AuthMiddleware } from '../../../presentation/midlewares/auth-middleware'

export const makeAuthMiddleware = (role?: string): Middleware => {
    return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
