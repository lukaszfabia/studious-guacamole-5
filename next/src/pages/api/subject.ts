import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "@/db/schema/response";
import { connectToDatabase } from "@/db/connect";
import { Subject } from "@/db/schema/subject";
import { Time } from "@internationalized/date";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Subject> | Response<Subject[]>>,
) {
    switch (req.method) {
        case 'POST':
            POST(req, res);
            break;
        case 'GET':
            GET(req, res);
            break;
        default:
            break;
    }
}


async function POST(
    req: NextApiRequest,
    res: NextApiResponse<Response<Subject>>) {
    try {
        const newSubject: Subject = req.body;
        const { db } = await connectToDatabase();

        const result = await db.collection("subjects").insertOne(newSubject);

        if (result.insertedId) {
            const insertedSubject = await db.collection("subjects").findOne({ _id: result.insertedId }) as unknown as Subject;

            res.status(200).json({
                model: insertedSubject,
                message: "Subject successfully created!",
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
    res: NextApiResponse<Response<Subject[]>>) {
    try {
        const { db } = await connectToDatabase();

        const subjects = await db.collection("subjects").find({}).toArray() as unknown as Subject[];


        if (subjects) {
            res.status(200).json({
                model: subjects,
                message: "Subjects found!",
                status: "success",
            });
        } else {
            res.status(404).json({
                message: "Subjects not found",
                status: "failed",
            });
        }

    } catch (err) {
        res.status(500)
    }
}