import {
    Authentication,
    AuthenticationModel,
    HashComparer,
    Encrypter,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    private readonly hashComparer: HashComparer
    private readonly encrypterGenerator: Encrypter
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

    constructor (
        loadAccountByEmailRepository: LoadAccountByEmailRepository, 
        hashComparer: HashComparer,
        encrypterGenerator: Encrypter,
        updateAccessTokenRepository: UpdateAccessTokenRepository
    ) {
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
        this.hashComparer = hashComparer
        this.encrypterGenerator = encrypterGenerator
        this.updateAccessTokenRepository = updateAccessTokenRepository
    }

    async auth (authentication: AuthenticationModel): Promise<string> {
        const account = await this.loadAccountByEmailRepository.load(authentication.email)
        if (account) {
            const isValid = await this.hashComparer.compare(authentication.password, account.password)
            if (isValid) {
                const accessToken = await this.encrypterGenerator.encrypt(account.id)
                await this.updateAccessTokenRepository.update(account.id, accessToken)
                return accessToken
            }
        }
        return null
    }
}
