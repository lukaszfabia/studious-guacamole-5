import { Level } from "@/db/schema/note";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Level[]>,
) {
    switch (req.method) {
        case 'GET':
            const lvls: Level[] = [
                "high", "low", "mid",
            ]
            console.log("Fetching levels");
            res.status(200).json(lvls);
            break;
        default:
            res.status(400);
    }
}
