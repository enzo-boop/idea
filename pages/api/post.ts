import { NextApiRequest, NextApiResponse } from "next";
import { get, getAll, post, put, remove } from "@/server-services/post.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const id: string | undefined = req.query["id"] as string | undefined;
      if (id) await get(id, res);
      else await getAll(req, res);
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
