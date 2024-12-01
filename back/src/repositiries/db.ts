import { MongoClient } from "mongodb"
import { CoursesType } from "./courses-repository-db"



const mongoUri = process.env.mongoURI = "mongodb://0.0.0.0:27017"


const client = new MongoClient(mongoUri)
const db = client.db("courses")
export const coursesCollection = db.collection<CoursesType>("courses")

export async function runDb() {
    try {
        await client.connect();

        await client.db("courses").command({ ping: 1 })
        console.log("Connected successfuly to mongo server")
    } catch {
        console.log("Can`t connect to server")
        await client.close()
    }


} 