import NoteCard from "@/components/NoteCard";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { Note as note } from "@/db/schema/note";
import { Response } from "@/db/schema/response";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "next/router"
import useSWR from "swr";

export default function Note() {
    const router = useRouter();

    const { data, error } = useSWR<Response<note>>(`/api/note/${router.query.uid}`, fetcher)

    if (error) return <div className="text-center">error</div>
    if (!data) return <LoadingIndicator />

    return (
        data.model ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <NoteCard note={data.model} saveOption />
            </div>
        ) : (
            <div>{data.message}</div>
        )
    )
}