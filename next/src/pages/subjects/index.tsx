import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { Subject, subjectTypes } from "@/db/schema/subject";
import { fetcher } from "@/lib/fetcher";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Form, Input, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import useSWR from "swr";
import { post } from "@/lib/crud";
import useSWRMutation from "swr/mutation";
import { ChangeEvent, FormEvent, useState } from "react";
import { Response } from "@/db/schema/response";

export default function SubjectCreator() {
    const { data, isLoading } = useSWR<Response<Subject[]>>("/api/subject", fetcher);
    const { trigger: postSub, isMutating: isCreating } = useSWRMutation("/api/subject", post<Subject>);
    const [type, setType] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    if (isLoading) return <LoadingIndicator />;


    const addSubject = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const body: Subject = {
            name: form.get("name")?.toString().trim()!,
            type: type!,
        }

        try {
            const r = await postSub(body)

            if (r.message === "failed") {
                setError(r.message ?? r.status)
            }
        } catch (error) {
            setError("Something went wrong")
        }

    }

    const handleSubjectType = (v: ChangeEvent<HTMLSelectElement>) => {
        const type = v.target.value.toLowerCase()
        setType(subjectTypes.find((e) => e.toLowerCase() === type) ?? null)
    }


    return (
        <section className="p-8 lg:p-20 space-y-6">
            <h1 className="text-3xl font-extrabold">Add some new subjects</h1>
            {data?.status === "failed" && <p className="text-red-500">Failed to get subjects</p>}
            {error && <p className="text-red-500">Failed to cerate new subject</p>}
            <Form className="w-1/2" onSubmit={addSubject}>
                <div className="flex w-full space-x-4">
                    <Input placeholder="Name..." name="name" id="name" required />
                    <Select className="max-w-xs" labelPlacement="outside" placeholder="Select type" required onChange={handleSubjectType}>
                        {subjectTypes.map((elem: string) => (
                            <SelectItem key={elem} value={elem}>
                                {elem}
                            </SelectItem>
                        ))}
                    </Select>
                    <Button variant="shadow" color="success" className="w-fit" type="submit" isDisabled={isCreating}>
                        {isCreating ? <Spinner size="sm" /> : <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />}
                    </Button>
                </div>
            </Form>

            <Table aria-label={data?.model && data.model.length > 0 ? "Subjects" : "Example empty table"}>
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No rows to display.">
                    {data?.model && data.model.length > 0
                        ? data.model.map((elem: Subject) => (
                            <TableRow key={elem._id?.toString()}>
                                <TableCell>{elem.name}</TableCell>
                                <TableCell>{elem.type}</TableCell>
                            </TableRow>
                        ))
                        : []}
                </TableBody>
            </Table>

        </section>
    );
}
