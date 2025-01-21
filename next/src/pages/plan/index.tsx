import ItemBlock from "@/components/ItemBlock"
import { PlanItem } from "@/db/schema/plan"
import { Subject, } from "@/db/schema/subject"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Button, Form, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure, Select, SelectItem, Textarea, Spinner } from "@nextui-org/react"
import { ChangeEvent, FormEvent, useState } from "react"
import { Link, TimeInput } from "@heroui/react";
import { Response } from "@/db/schema/response";
import useSWRMutation from "swr/mutation"
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import LoadingIndicator from "@/components/ui/LoadingIndicator"
import { parseTime } from "@internationalized/date"
import { post, remove } from "@/lib/crud"
import { comparePlanItem } from "@/lib/time"




const AddNewPlan = ({ onClose }: { onClose: () => void }) => {
    const { data, isLoading } = useSWR<Response<Subject[]>>("/api/subject", fetcher)
    const { trigger: postPlan, isMutating: isCreating } = useSWRMutation("/api/plan", post<PlanItem>);
    const [error, setError] = useState<string | null>(null);
    const [targetSub, setTargetSub] = useState<Subject | null>(null);

    const addPlan = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        try {
            if (!targetSub) {
                setError("Select subject!")
                return
            }

            const newPlan: PlanItem = {
                subject: targetSub,
                note: formData.get("note")?.toString(),
                start: parseTime(formData.get("start")?.toString()!),
                finish: parseTime(formData.get("finish")?.toString()!),
            }


            const r = await postPlan(newPlan)

            if (r.status === "failed") {
                setError(r.message ?? r.status)
            }

        } catch (error) {
            setError("Something went wrong!")
        }
    }

    const handleSubject = (v: ChangeEvent<HTMLSelectElement>) => {
        const id = v.target.value
        setTargetSub(data!.model!.find((subject: Subject) => subject._id?.toString() === id) ?? null)
    }


    return (
        <>
            <ModalHeader className="flex flex-col gap-1">
                <div className="space-y-1">
                    <h1 className="text-2xl">Add new activity</h1>
                    {error && <p className="text-red-600">{error}</p>}
                </div>
            </ModalHeader>
            <ModalBody>
                {isLoading && <LoadingIndicator />}
                {!data?.model && (
                    <div>
                        <h2 className="text-warning-400 font-semibold text-xl">Warning</h2>
                        <p>Firstly you must add <Link href="/subjects">subjects</Link>.</p>
                    </div>
                )}
                {data?.model && data.model.length > 0 && (
                    <Form onSubmit={addPlan} id="createNewBlock">
                        <div className="flex space-x-2 w-full">
                            <Select required className="max-w-xs" label="Select subject" onChange={handleSubject}>
                                {data.model!.map((subject: Subject) => (
                                    <SelectItem key={subject._id?.toString()} value={subject._id?.toString()}>{subject.name}</SelectItem>
                                ))}
                            </Select>

                            <Textarea name="note" id="note" className="max-w-xs h-auto" label="Note to plan" placeholder="Additional note..." />
                        </div>
                        <div className="flex gap-4">
                            <TimeInput isRequired label="Start" name="start" id="start" />
                            <TimeInput isRequired label="Finish" name="finish" id="finish" />
                        </div>
                    </Form>
                )}

            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Close
                </Button>
                <Button color="success" onPress={onClose} variant="shadow" isDisabled={isCreating || !data} type="submit" form="createNewBlock">
                    {isCreating ? <Spinner size="sm" /> : <>Ok</>}
                </Button>
            </ModalFooter>
        </>
    )
}


export default function MyPlans() {
    const { data, isLoading } = useSWR<Response<PlanItem[]>>("/api/plan", fetcher)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { trigger: removePlan, isMutating: isDeleting } = useSWRMutation("/api/plan", remove);

    const [error, setError] = useState<string | null>(null);


    if (isLoading) return <LoadingIndicator />
    if (!data) return <div>No plans yet</div>

    const handleRemove = async (plan: PlanItem) => {
        setError(null)

        // call api function
        try {

            const r = await removePlan(plan)

            if (r.status === "failed") {
                setError(r.message ?? r.status)
            }

        } catch (err) {
            setError("Something went wrong!")
        }
    }

    return (
        <section className="p-8 lg:p-20 space-y-6">
            <h1 className="text-6xl font-extrabold">Plan <span className="text-blue-600">Builder</span></h1>
            <p className="text-gray-500 text-lg">for CS students</p>

            {(!data.model || data.model.length === 0) && <h1 className="text-3xl font-extrabold">Add new activity</h1>}
            {error && <h1 className="text-red-600">{error}</h1>}
            <div className="flex flex-wrap gap-6 lg:gap-10">
                {data && data.model!.length > 0 && data.model!.sort((a, b) => comparePlanItem(a, b)).map((plan: PlanItem) => <ItemBlock key={plan._id?.toString()} item={plan} onRemove={handleRemove} isDeleting={isDeleting} />)}

                <div className="p-6 max-w-sm w-full flex items-center justify-center rounded-lg shadow-xl hover:shadow-2xl transition-all">
                    <Button color="success" variant="shadow" className="opacity-100 w-20 h-20 rounded-full hover:bg-green-500 transition-colors" onPress={onOpen}>
                        <FontAwesomeIcon icon={faPlus} className="w-7 h-7 text-white" />
                    </Button>
                </div>
            </div>

            <Modal isOpen={isOpen} size="3xl" onClose={onClose}>
                <ModalContent>
                    {(onClose) => (
                        <AddNewPlan onClose={onClose} />
                    )}
                </ModalContent>
            </Modal>
        </section>
    );
}
