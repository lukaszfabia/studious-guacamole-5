import { Note } from "@/db/schema/note";
import { NextApiRequest, NextApiResponse } from "next";
import { Response } from "@/db/schema/response";
import { connectToDatabase } from "@/db/connect";
import { ObjectId } from "mongodb";
import fs from 'fs';

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

        const filePath = `/app/jsons/${r.title}-${r.lvl}.json`;

        fs.writeFile(filePath, JSON.stringify(r), (err) => {
            if (err) {
                return res.status(500).json({
                    message: "Something went wrong!",
                    status: "failed",
                });
            }
            res.status(200).json({
                message: "Done!",
                status: "success",
            });
        });


    } catch (error) {
        res.status(500);
    }
}
