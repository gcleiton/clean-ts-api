import { HttpResponse } from './../../presentation/protocols/http';
import { Controller, HttpRequest, HttpResponse } from "../../presentation/protocols";
import { LogControllerDecorator } from "./log";

describe('LogController Decorator', () => {
    interface SutTypes {
        sut: LogControllerDecorator
        controllerStub: Controller
    }

    const makeController = (): Controller => {
        class ControllerStub implements Controller {
            async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
                const httpResponse: HttpResponse = {
                    statusCode: 200,
                    body: {
                        name: 'Gabriel'

                    }
                }
                return new Promise(resolve => resolve(httpResponse))
            }
        }
        return new ControllerStub()
    }

    const makeSut = (): any => {
        const controllerStub = makeController()
        const sut = new LogControllerDecorator(controllerStub)

        return {
            sut,
            controllerStub
        }
    }

    test('Should call controller handle', async () => {
        const { sut, controllerStub } = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest = {
            body: {
                email: 'any_mail@mail.com',
                name: 'any_name',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })
})
