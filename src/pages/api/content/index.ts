import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await prisma.contents.create({
      data: req.body,
    });
    console.log(req.body);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);

    res.status(500).json({ ok: false });
  }
};

export default handler;
