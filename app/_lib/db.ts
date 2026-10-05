import { MongoClient } from 'mongodb'

const url = process.env.URL

if (!url) {
  throw new Error('Missing MongoDB Connection URL')
}

const client = new MongoClient(url)

export default client