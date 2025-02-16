import { NextApiRequest, NextApiResponse } from "next";
import { get, post, put, remove } from "@/server-services/post.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      await get(req, res);
      break;

    case "POST":
      await post(req, res);
      break;

    case "PUT":
      await put(req, res);
      break;

    case "DELETE":
      await remove(req, res);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Metodo ${req.method} non consentito`);
      break;
  }
}
