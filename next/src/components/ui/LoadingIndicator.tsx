import { Spinner } from "@nextui-org/react";

export default function LoadingIndicator() {
    return (
        <div className="flex gap-4 items-center justify-center">
            <Spinner />
        </div>
    )
} 