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

    try {
        const { db } = await connectToDatabase();

        if (typeof uid === 'string') {
            const r = await db.collection("notes").deleteOne({ _id: new ObjectId(uid) })

            return r.deletedCount === 1 ? res.status(200).json({
                message: "Deleted",
            }) : res.status(404).json({
                message: "Failed to find note",
            })
        }
    } catch (error) {
        return res.status(500).json(
            {
                message: "Internal erorr"
            }
        )
    }
}


async function GET(
    req: NextApiRequest,
    res: NextApiResponse<Response<Note>>
) {
    const { uid } = req.query;

    try {
        const { db } = await connectToDatabase();

        if (typeof uid === 'string') {
            const note = await db.collection("notes").findOne({ _id: new ObjectId(uid) }) as unknown as Note;

            if (note) {
                return res.status(200).json({
                    model: note,
                    message: "Note found!",
                });
            } else {
                return res.status(404).json({
                    message: "Note not found",
                });
            }
        } else {
            return res.status(400).json({
                message: "Invalid 'id' parameter",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
        });
    }
}