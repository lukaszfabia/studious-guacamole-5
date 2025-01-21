import { Subject } from "@/db/schema/subject"
import { Time } from "@internationalized/date"
import { ObjectId } from "bson"

export type PlanItem = {
    _id?: ObjectId,
    subject: Subject // like web dev, maths
    note?: string | null
    start: Time
    finish: Time
}   