import { AccountModel } from "../../domain/models/account";

export interface Encrypter {
    encrypt (value: string): Promise<string>
}