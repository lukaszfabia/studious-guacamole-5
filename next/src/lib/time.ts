import { PlanItem } from "@/db/schema/plan"
import { Time } from "@internationalized/date"

export function trasformTime(item: PlanItem): PlanItem {
    console.log(item)
    return {
        _id: item._id,
        subject: item.subject,
        note: item.note,
        start: new Time(item.start.hour, item.start.minute),
        finish: new Time(item.finish.hour, item.finish.minute),
    }
}


export function comparePlanItem(lhs: PlanItem, rhs: PlanItem): number {
    const fixed1 = trasformTime(lhs)
    const fixed2 = trasformTime(rhs)


    return fixed1.start.compare(fixed2.start) === 0 ?
        fixed1.finish.compare(fixed2.finish) :
        fixed1.start.compare(fixed2.start)
}