import { PlanItem } from "./plan"

import { Subject } from "./subject"

export type Model = PlanItem | Subject | PlanItem[] | Subject[]


export type Response<T extends Model> = {
    model?: T | null
    message?: string | null
    status: "success" | "failed"
}