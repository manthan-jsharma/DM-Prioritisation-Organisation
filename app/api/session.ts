import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

const sessionRoute = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, {});
  return res.json(session);
};

export default sessionRoute;
