// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Note } from "@/db/schema/note";
import type { NextApiRequest, NextApiResponse } from "next";
import { Response } from "@/db/schema/response";
import { connectToDatabase } from "@/db/connect";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Note> | Response<Note[]>>,
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


async function GET(
    req: NextApiRequest,
    res: NextApiResponse<Response<Note[]>>,
) {

    try {
        const { db } = await connectToDatabase();

        const notes = await db.collection("notes").find({}).toArray() as unknown as Note[];
        res.status(200).json({
            model: notes,
            status: "success",
        });
    } catch (error) {
        res.status(500);
    }
}


async function POST(
    req: NextApiRequest,
    res: NextApiResponse<Response<Note>>,
) {
    try {
        const newNote: Note = req.body;
        const { db } = await connectToDatabase();

        const result = await db.collection("notes").insertOne(newNote);

        if (result.insertedId) {
            const insertedNote = await db.collection("notes").findOne({ _id: result.insertedId }) as unknown as Note;

            res.status(200).json({
                model: insertedNote,
                message: "Note successfully created!",
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