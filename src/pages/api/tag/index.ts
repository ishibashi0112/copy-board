import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  try {
    if (method === "GET") {
      const tags = await prisma.tags.findMany({
        orderBy: { updatedAt: "asc" },
        select: {
          id: true,
          name: true,
          contents: {
            select: { id: true, title: true, body: true, tagId: true },
          },
        },
      });

      res.status(200).json({ ok: true, tags });
    } else if (method === "POST") {
      const tag = await prisma.tags.create({
        data: req.body,
      });

      res.status(200).json({ ok: true, tag });
    }
  } catch (error) {
    res.status(500).json({ ok: false });
  }
};

export default handler;
