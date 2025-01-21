import { PlanItem } from "@/db/schema/plan";
import { Button, Chip, Spinner, TimeInput } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Time } from "@internationalized/date";
import { useEffect, useState } from "react";
import LoadingIndicator from "./ui/LoadingIndicator";
import { trasformTime } from "@/lib/time";

export const example: PlanItem = {
    subject: {
        name: "web dev",
        type: "IT"
    },
    note: "Wziac kompa",
    start: new Time(12, 12),
    finish: new Time(17, 30),
}

function sub(item: PlanItem): string {
    const fixed = trasformTime(item)

    const res = fixed.finish.subtract({
        hours: fixed.start.hour,
        minutes: fixed.start.minute,
    })

    const time = res.hour * 60 + res.minute
    return time.toString()
}


export default function ItemBlock({ onRemove, isDeleting, item = example }: { onRemove: (plan: PlanItem) => void, isDeleting: boolean, item?: PlanItem }) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => { setIsMounted(true) }, [])

    if (!isMounted) return <LoadingIndicator />

    return (
        <div className="p-6 max-w-sm w-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-indigo-900 rounded-lg shadow-xl space-y-2">
            <div className="flex justify-between">
                <div className="space-x-2">
                    <Chip color="warning" variant="flat" className="text-white">
                        {item.subject.type}
                    </Chip>
                    <Chip color="warning" variant="flat" className="text-white">
                        {sub(item)} min.
                    </Chip>
                </div>
                <Button isIconOnly aria-label="Remove task" color="danger" variant="light" size="sm" onPress={() => { onRemove(item) }}>
                    <FontAwesomeIcon icon={faXmark} className="w-3 h-3" />
                </Button>
            </div>
            <h1 className="text-3xl font-bold text-white">{item.subject.name}</h1>
            <p className="text-sm text-gray-100">{item.note}</p>
            <div className="flex gap-5">
                <TimeInput isReadOnly defaultValue={item.start} className="w-fit" />
                <TimeInput isReadOnly defaultValue={item.finish} className="w-fit" />
            </div>
        </div>
    );
}
