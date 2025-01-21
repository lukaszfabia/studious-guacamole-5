import { Model } from "@/db/schema/response";
import { Response } from "@/db/schema/response";

export async function post<T extends Model>(url: string, { arg }: { arg: T }): Promise<Response<T>> {
    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error("Failed to create");
    }

    return response.json();
}

export async function remove<T extends Model>(url: string, { arg }: { arg: T }): Promise<Response<T>> {
    const response = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
    });

    if (!response.ok) {
        throw new Error("Failed to remove");
    }

    return response.json();
}
