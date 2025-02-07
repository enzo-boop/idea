import { Post } from "@/app/globals/models/models";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import buffer from "buffer";
import { NextApiRequest, NextApiResponse } from "next";

dotenv.config();

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const posts = await sql`SELECT * FROM posts ORDER BY created_at DESC;`;
        res.status(200).json(posts);
      } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Errore nel recupero dei post" });
      }
      break;
    case "POST":
      try {
        const body: Post = req.body;
        if (!body.author) {
          return res
            .status(400)
            .json({ error: "L'autore è obbligatorio" });
        }
        const buffer = Buffer.from(body.image_url!, 'base64'); 
        const fileName = `image-${Date.now()}.jpg`;
        const filePath = path.join(process.cwd(), 'public', fileName);
        fs.writeFileSync(filePath, <unknown>buffer as string); 
        body.created_at = new Date();
        const idPost = await sql`
        INSERT INTO posts (author, text, image_url, created_at)
        VALUES (${body.author}, ${body.text ?? null}, ${fileName ?? null}, ${body.created_at ?? sql`CURRENT_TIMESTAMP`})
        RETURNING ID;
      `;
        res.status(201).json({ id: idPost[0].id });
      } catch (error) {
        console.log(error,req.body)
        res.status(500).json({ error: "Errore nella creazione del post" });
      }
      break;
    case "PUT":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "ID del post è obbligatorio" });
        }

        const body: Post = JSON.parse(req.body);
        if (!body.author) {
          return res.status(400).json({ error: "L'autore è obbligatorio" });
        }

        const updatedPost = await sql`
          UPDATE posts
          SET author = ${body.author}, text = ${body.text ?? null}, image_url = ${body.image_url ?? null}
          WHERE id = ${id}
          RETURNING *;
        `;

        if (updatedPost.length === 0) {
          return res.status(404).json({ error: "Post non trovato" });
        }

        res.status(200).json(updatedPost[0]);
      } catch (error) {
        res.status(500).json({ error: "Errore nell'aggiornamento del post" });
      }
      break;
    case "DELETE":
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: "ID del post è obbligatorio" });
        }

        const deletedPost = await sql`
          DELETE FROM posts WHERE id = ${id} RETURNING *;
        `;

        if (deletedPost.length === 0) {
          return res.status(404).json({ error: "Post non trovato" });
        }

        res.status(200).json({ message: "Post eliminato con successo" });
      } catch (error) {
        res.status(500).json({ error: "Errore nell'eliminazione del post" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Metodo ${req.method} non consentito`);
      break;
  }
}
