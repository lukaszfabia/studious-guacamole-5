import NoteCard from "@/components/NoteCard"
import LoadingIndicator from "@/components/ui/LoadingIndicator"
import { Note } from "@/db/schema/note"
import { Response } from "@/db/schema/response"
import { fetcher } from "@/lib/fetcher"
import { Link } from "@nextui-org/react"
import useSWR from "swr"

const NoNotes = () => {
    return (
        <div className="text-center">
            <h1 className="text-3xl font-extrabold">No notes yet!</h1>
            <p className="text-gray-400"><Link href="/notes/new">Add</Link> new notes</p>
        </div>
    )
}


export default function Notes() {
    const { data, error } = useSWR<Response<Note[]>>("/api/note", fetcher);

    if (data?.model?.length === 0 && !error) {
        return <NoNotes />
    }
    if (error) return <div>error</div>
    if (!data) return <LoadingIndicator />

    return (
        data.model ? (
            <section>
                <h1 className="text-3xl font-extrabold text-center py-10">
                    Here we <span className="text-sky-400 ">Go</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {data.model.map((note: Note) => (
                        <NoteCard note={note} key={note._id?.toString()} />
                    ))}
                </div>
            </section>
        ) : (
            <div>
                {data.message}
            </div>
        )
    )
}