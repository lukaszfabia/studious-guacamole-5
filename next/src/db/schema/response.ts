import { Note } from "./note"

type Model = Note | Note[]


export type Response<T extends Model> = {
    model?: T | null
    message: string
}