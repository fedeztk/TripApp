// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import {MongoClient} from 'mongodb'

if (!process.env.MONGODB_URI || !process.env.MONGODB_USERNAME || !process.env.MONGODB_PASSWORD) {
    throw new Error('Invalid/Missing mongodb environment variable')
}

const uri = "mongodb://" + process.env.MONGODB_USERNAME + ":" + process.env.MONGODB_PASSWORD + "@" + process.env.MONGODB_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

client = new MongoClient(uri, options)
clientPromise = client.connect()

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise