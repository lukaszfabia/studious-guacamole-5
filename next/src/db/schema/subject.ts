import { ObjectId } from "mongodb";

export type SubjectType = "IT" | "Maths" | "Managment" | "Foreign languages" | string

export const subjectTypes: string[] = [
    "IT",
    "Maths",
    "Management",
    "Foreign languages",
]

export interface Subject {
    _id?: ObjectId
    name: string // web dev
    type: SubjectType
}