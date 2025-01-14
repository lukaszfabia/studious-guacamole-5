import { Level, Note } from "@/db/schema/note";
import { Response } from "@/db/schema/response";
import { fetcher } from "@/lib/fetcher";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Link, Spinner, Tooltip } from "@nextui-org/react";
import { ObjectId } from "mongodb";
import { useState } from "react";
import useSWR from "swr";

function getColor(lvl: Level): string {
    switch (lvl) {
        case "high":
            return "text-red-700 animate-pulse";
        case "low":
            return "text-green-500";
        case "mid":
            return "text-yellow-600";
        default:
            return "";
    }
}


export default function NoteCard({ note, saveOption }: { note: Note, saveOption?: boolean }) {
    const [isSaved, setIsSaved] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [savedPath, setSavedPath] = useState<string | null>(null);

    async function save() {
        setLoading(true);
        setError(null);

        try {
            const response = await fetcher(`/api/note/${note._id!.toString()}/save`) as Response<string>;
            if (response && response.status == "success") {
                setIsSaved(true);
                setError(null);
                setSavedPath(response.model!);
            } else {
                console.log(error);
                setError('Something went wrong!');
            }
        } catch (err) {
            setError('Something went wrong!');
        } finally {
            setLoading(false);
        }
    }

    return (
        <Card className="max-w-[400px] block">
            <CardHeader className="flex gap-3 justify-between">
                <div>
                    <h1 className="text-lg">
                        <Link href={`/notes/${note._id!.toString()}`}>
                            {note.title}</Link></h1>
                </div>

                <div>
                    {saveOption && note._id && (
                        <Tooltip content={`${savedPath ? savedPath : "Click me to dump a note!"}`}>
                            <Button
                                variant={`${isSaved ? "solid" : "ghost"}`}
                                color={`${error != null ? "danger" : "success"}`}
                                size="sm"
                                onPress={save}>
                                {loading && <Spinner />}
                                {!loading && <>To json</>}

                            </Button>
                        </Tooltip>
                    )}
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{note.section}</p>
            </CardBody>
            <Divider />
            <CardFooter className="flex items-center justify-between">
                <div>
                    <p className={`${getColor(note.lvl)
                        } `}>{note.lvl}</p>
                </div>
                <div>
                    <p>{note.deadline.toString()}</p>
                </div>
            </CardFooter>
        </Card>
    )
}