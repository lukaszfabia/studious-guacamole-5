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
        return res.status(200).json({
            model: notes,
            message: "Success!"
        })
    } catch (error) {
        return res.status(500).json({
            message: "Interal erorr",
        })
    }
}


async function POST(
    req: NextApiRequest,
    res: NextApiResponse<Response<Note>>,
) {
    try {
        const newNote: Note = req.body
        const { db } = await connectToDatabase();

        const result = await db.collection("notes").insertOne(newNote);

        if (result.insertedId) {
            const insertedNote = await db.collection("notes").findOne({ _id: result.insertedId }) as unknown as Note;

            return res.status(200).json({
                model: insertedNote,
                message: "Note successfully created!",
            });
        } else {
            return res.status(500).json({
                message: "Error inserting note",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: "Internal error",
        });
    }
}