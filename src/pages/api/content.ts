import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const contentHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await prisma.contents.create({
        data: req.body,
      });
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(505).json({ ok: false });
    }
  }

  if (req.method === "PUT") {
    try {
      await prisma.contents.update({
        where: { id: "" },
        data: req.body,
      });
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(505).json({ ok: false });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.contents.deleteMany({
        where: { id: "" },
      });
      res.status(200).json({ ok: true });
    } catch (error) {
      res.status(505).json({ ok: false });
    }
  }
};

export default contentHandler;
