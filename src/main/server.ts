import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

MongoHelper.connect(env.mongoUrl)
    .then(async () => {
        const app = (await import('./config/app')).default // garantir que o app seja apenas utilizado após conectado ao banco de dados
        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    })
    .catch(console.error)
