import { connectToDatabase } from "@/db/connect";
import { Response } from "@/db/schema/response";
import { PlanItem } from "@/db/schema/plan";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<PlanItem> | Response<PlanItem[]>>,
) {
    if (req.method !== "DELETE") {
        res.status(405)
        return
    }

    const { uid } = req.query


    if (typeof uid !== "string") {
        return res.status(400);
    }

    try {
        const { db } = await connectToDatabase();

        const r = await db.collection("plans").deleteOne({ _id: new ObjectId(uid) })

        return r.deletedCount === 1 ? res.status(200).json({
            message: "Deleted",
            status: "success",
        }) : res.status(404).json({
            message: "Failed to find plan",
            status: "failed",
        })
    } catch (error) {
        res.status(500)
    }
}

