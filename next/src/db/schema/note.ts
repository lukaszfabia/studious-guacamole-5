import { ObjectId } from "mongodb"

export type Level = "low" | "mid" | "high"

export type Note = {
    _id?: ObjectId,
    title: string,
    section: string,
    lvl: Level,
    deadline: Date
}