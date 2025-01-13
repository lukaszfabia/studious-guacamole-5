import LoadingIndicator from "@/components/ui/LoadingIndicator"
import { Note } from "@/db/schema/note"
import { Response } from "@/db/schema/response"
import { fetcher } from "@/lib/fetcher"
import useSWR from "swr"

export default function Notes() {
    const { data, error } = useSWR<Response<Note[]>>("/api/note", fetcher);

    if (error) return <div>error</div>
    if (!data) return <LoadingIndicator />

    return (
        data.model ? (
            <div>
                {data.model.map((note: Note) => (
                    <div>{note.title}</div>
                ))}
            </div>
        ) : (
            <div>
                {data.message}
            </div>
        )
    )
}