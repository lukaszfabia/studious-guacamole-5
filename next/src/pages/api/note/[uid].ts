import { Note } from '@/db/schema/note';
import { NextApiRequest, NextApiResponse } from 'next';
import { Response } from '@/db/schema/response';
import { connectToDatabase } from '@/db/connect';
import { ObjectId } from 'mongodb';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response<Note>>,
) {
    switch (req.method) {
        case 'GET':
            GET(req, res);
            break;
        case 'DELETE':
            DELETE(req, res);
            break;
    }
}

async function DELETE(
    req: NextApiRequest,
    res: NextApiResponse<Response<Note>>,
) {
    const { uid } = req.query;

    if (typeof uid !== "string") {
        return res.status(400);
    }

    try {
        const { db } = await connectToDatabase();

        const r = await db.collection("notes").deleteOne({ _id: new ObjectId(uid) })

        return r.deletedCount === 1 ? res.status(200).json({
            message: "Deleted",
            status: "success",
        }) : res.status(404).json({
            message: "Failed to find note",
            status: "failed",
        })
    } catch (error) {
        res.status(500)
    }
}


async function GET(req: NextApiRequest, res: NextApiResponse<Response<Note>>) {
    const { uid } = req.query;

    try {
        if (typeof uid === 'string') {
            const { db } = await connectToDatabase();

            const note = await db.collection("notes").findOne({ _id: new ObjectId(uid) }) as Note;

            if (note) {
                res.status(200).json({
                    model: note,
                    message: "Note found!",
                    status: "success",
                });
            } else {
                res.status(404).json({
                    message: "Note not found",
                    status: "failed",
                });
            }
        } else {
            res.status(400).json({
                message: "Invalid 'uid' parameter",
                status: "failed",
            });
        }
    } catch (error) {
        res.status(500);
    }
}