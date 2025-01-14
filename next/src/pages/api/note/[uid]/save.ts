import { Note } from "@/db/schema/note";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "@/db/schema/response";
import { connectToDatabase } from "@/db/connect";
import { ObjectId } from "mongodb";
import fs from 'fs';
import path from "path";
import writer from "@/lib/writer";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<string>>,
) {

    const { uid } = req.query;

    if (typeof uid !== 'string') {
        return res.status(400).json({
            status: "failed",
        })
    }

    try {
        const { db } = await connectToDatabase();

        const r = await db.collection("notes").findOne({ _id: new ObjectId(uid) }) as unknown as Note;

        const filename = `${r.title}-${r.deadline.toString()}`;

        const resultPath = await writer(r, filename)

        res.status(200).json({
            status: "success",
            model: resultPath,
        })

    } catch (error) {
        res.status(500);
    }
}
