import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.secret !== process.env.NEXT_PUBLIC_MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const url = req.body.url as string;
    // 再検証させるページのpathを引数に渡す
    await res.revalidate(url);
    return res.json({ revalidated: true });
  } catch (err) {
    return console.log(err);
  }
};
export default handler;
