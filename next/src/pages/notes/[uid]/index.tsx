import NoteCard from "@/components/NoteCard";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { Note as note } from "@/db/schema/note";
import { Response } from "@/db/schema/response";
import { fetcher } from "@/lib/fetcher";
import { Snippet } from "@nextui-org/react";
import { useRouter } from "next/router"
import useSWR from "swr";

export default function Note() {
    const router = useRouter();

    const { data, error } = useSWR<Response<note>>(`/api/note/${router.query.uid}`, fetcher)

    if (error) return <div className="text-center">error</div>
    if (!data) return <LoadingIndicator />

    return (
        data.model ? (
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
                <div className="flex-1">
                    <h1 className="font-extrabold text-3xl text-center md:text-left">
                        The <span className="text-orange-400">place</span> where you can <span className="text-orange-400">save</span> a note!
                    </h1>
                    <p className="text-gray-500 py-4 text-center md:text-left w-3/4">
                        You should be able to find it in project <code>dir</code> or just run this command in <code>shell</code> and look for a <code>/json/</code> dir.
                    </p>
                    <div className="text-center md:text-left">
                        <Snippet size="sm">docker exec -it (container with app) /bin/bash</Snippet>
                    </div>
                </div>

                <div className="flex-1 pt-6 md:pt-3 text-center max-sm:flex max-sm:justify-center max-sm:items-center">
                    <NoteCard note={data.model} saveOption />
                </div>
            </div>

        ) : (
            <div>{data.message}</div>
        )
    )
}