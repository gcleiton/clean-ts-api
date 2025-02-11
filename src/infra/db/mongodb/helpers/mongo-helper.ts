import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
    client: null as MongoClient,
    url: null as string,

    async connect (uri: string): Promise<void> {
        this.uri = uri
        this.client = await MongoClient.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },

    async disconnect (): Promise<void> {
        await this.client.close()
        this.client = null
    },

    async getCollection (name: string): Promise<Collection> {
        if (!this.client?.isConnected()) {
            await this.connect(this.uri)
        }

        return this.client.db().collection(name)
    },

    map: (data: any): any => {
        const { _id, ...accountWithoutId } = data
        return Object.assign({}, accountWithoutId, { id: _id })
    },

    mapCollection: (collection: any[]): any[] => {
        return collection.map(c => MongoHelper.map(c))
    }
}