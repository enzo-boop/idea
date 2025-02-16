import { Post, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export async function get(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const prisma = new PrismaClient();
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero dei post" });
  }
}

export async function post(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const prisma = new PrismaClient();
  try {
    const body: Post = req.body;
    if (!body.userId) {
      return res.status(400).json({ error: "L'autore è obbligatorio" });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: body.userId,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const newPost = await prisma.post.create({
      data: {
        userId: body.userId,
        title: body.title ?? null,
        content: body.content ?? null,
        imageUrl: body.imageUrl!,
        createdAt: new Date(),
      },
    });
    return res.status(201).json(newPost);
  } catch (error) {
    return res.status(500).json({ error: "Errore nella creazione del post" });
  }
}

export async function put(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const prisma = new PrismaClient();
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID del post è obbligatorio" });
    }

    const body: Post = JSON.parse(req.body);
    if (!body.userId) {
      return res.status(400).json({ error: "L'autore è obbligatorio" });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: id as string,
      },
      data: {
        title: body.title ?? null,
        content: body.content ?? null,
        imageUrl: body.imageUrl!,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiornamento del post" });
  }
}

export async function remove(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const prisma = new PrismaClient();
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({ error: "ID del post è obbligatorio" });
    }

    // Elimina il post
    const deletedPost = await prisma.post.delete({
      where: {
        id: id as string,
      },
    });

    res.status(200).json({ message: "Post eliminato con successo" });
  } catch (error) {
    res.status(500).json({ error: "Errore nell'eliminazione del post" });
  }
}
