import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id as string;

  try {
    if (req.method === "PUT") {
      await prisma.contents.update({
        where: { id },
        data: req.body,
      });
    }

    if (req.method === "DELETE") {
      await prisma.contents.deleteMany({
        where: { id },
      });
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false });
  }
};

export default handler;
