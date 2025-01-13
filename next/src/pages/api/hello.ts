// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export type info = {
  text: string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<info>,
) {
  res.status(200).json({
    text: `Successfully connected to db. Choosen db: ${process.env.DB_NAME}`,
  });
}
