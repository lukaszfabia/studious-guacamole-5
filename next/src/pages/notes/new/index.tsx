import { Form, Button, Input, Textarea, DateInput, Select, Spinner, SelectItem } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { FormEvent } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Level, Note } from "@/db/schema/note";
import { fetcher } from "@/lib/fetcher";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useRouter } from "next/router";
import { Response } from "@/db/schema/response";

async function postNote(url: string, { arg }: { arg: Note }): Promise<Response<Note>> {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error("Failed to create note");
    }

    return response.json();
}

export default function NewNote() {
    const router = useRouter();

    const { data: levels, error: levelsError } = useSWR<Level[]>("/api/note/levels", fetcher);

    const { trigger: createNote, isMutating: isCreating } = useSWRMutation("/api/note", postNote);

    if (levelsError) return <div className="text-center">Failed to load form</div>;
    if (!levels) return <LoadingIndicator />;

    const submit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = Object.fromEntries(new FormData(e.currentTarget)) as unknown as Note;

        try {
            await createNote(formData).then((data) => {
                if (data.model && data.model._id) {
                    router.push(`/notes/${data.model._id.toString()}`);
                } else {
                    router.push("/notes")
                }
            });
        } catch (error) {
            console.error("Failed to create note:", error);
        }
    };

    return (
        <div className="flex justify-center items-center">
            <Form
                className="w-full max-w-xs flex flex-col gap-4"
                validationBehavior="native"
                onSubmit={submit}
            >
                <Input
                    isRequired
                    errorMessage="Please provide a title for your note"
                    label="Title"
                    labelPlacement="outside"
                    name="title"
                    placeholder="e.g. Buy new kicks"
                    type="text"
                />

                <Textarea
                    isRequired
                    errorMessage="Please provide a section"
                    label="Section"
                    labelPlacement="outside"
                    name="section"
                    placeholder="e.g. Nike or Flip flops"
                    type="text"
                />

                <DateInput
                    isRequired
                    className="max-w-sm"
                    label="Deadline"
                    name="deadline"
                    placeholderValue={new CalendarDate(1995, 11, 6)}
                />

                <Select isRequired className="max-w-xs" label="Select priority" name="priority">
                    {levels.map((level: Level) => (
                        <SelectItem key={level} value={level}>
                            {level}
                        </SelectItem>
                    ))}
                </Select>

                <div className="flex gap-2">
                    <Button color="primary" type="submit" isDisabled={isCreating}>
                        {isCreating ? <Spinner size="sm" /> : "Submit"}
                    </Button>
                </div>
            </Form>
        </div>
    );
}
