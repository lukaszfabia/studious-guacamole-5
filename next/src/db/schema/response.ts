import { Note } from "./note"

type Model = Note | Note[] | string


export type Response<T extends Model> = {
    model?: T | null
    message?: string | null
    status: "success" | "failed"
}