import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "@/db/schema/response";
import { PlanItem } from "@/db/schema/plan";
import { connectToDatabase } from "@/db/connect";
import { trasformTime } from "@/lib/time";
import { ObjectId } from "mongodb";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<PlanItem> | Response<PlanItem[]>>,
) {
    switch (req.method) {
        case 'POST':
            POST(req, res);
            break;
        case 'GET':
            GET(req, res);
            break;
        case 'DELETE':
            DELETE(req, res);
            break;
        default:
            break;
    }
}


async function DELETE(req: NextApiRequest,
    res: NextApiResponse<Response<PlanItem>>) {

    const plan: PlanItem = req.body;

    try {
        const { db } = await connectToDatabase();

        const r = await db.collection("plans").deleteOne({ _id: new ObjectId(plan._id) })

        return r.deletedCount === 1 ? res.status(200).json({
            message: "Deleted",
            status: "success",
        }) : res.status(404).json({
            message: "Failed to find plan",
            status: "failed",
        })
    } catch (error) {
        console.log(error)
        res.status(500)
    }
}

async function POST(
    req: NextApiRequest,
    res: NextApiResponse<Response<PlanItem> | Response<PlanItem[]>>) {
    try {
        const newPlan: PlanItem = req.body;
        const { db } = await connectToDatabase();

        const result = await db.collection("plans").insertOne(newPlan);

        if (result.insertedId) {
            const insertedPlan = await db.collection("plans").findOne({ _id: result.insertedId }) as unknown as PlanItem;

            res.status(200).json({
                model: insertedPlan,
                message: "PlanItem successfully created!",
                status: "success",
            });
        } else {
            res.status(500).json({
                status: "failed",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500);
    }
}

async function GET(
    req: NextApiRequest,
    res: NextApiResponse<Response<PlanItem> | Response<PlanItem[]>>) {
    try {
        const { db } = await connectToDatabase();

        const plans = await db.collection("plans").find({}).toArray() as unknown as PlanItem[];



        if (plans) {
            res.status(200).json({
                model: plans,
                message: "Plans found!",
                status: "success",
            });
        } else {
            res.status(404).json({
                message: "Plans not found",
                status: "failed",
            });
        }

    } catch (err) {
        res.status(500)
    }
}