import type { NextApiResponse } from "next";

const handler = async (_: any, res: NextApiResponse) => {
  try {
    // 再検証させるページのpathを引数に渡す
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    return console.log(err);
  }
};
export default handler;
