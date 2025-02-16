const dotenv = require("dotenv");
import { Post } from "@/app/globals/models/models";
dotenv.config();

const endPoint: string = "/api/post";

export function getPosts(): Promise<Array<Post>> {
  return new Promise<Array<Post>>((resolve, reject) => {
    fetch(endPoint, { method: "GET" })
      .then((response) => response.json())
      .then((result: Array<Post>) => resolve(result))
      .catch(() => reject("Errore nel recupero dei dati"));
  });
}

export function getPost(id: string): Promise<Post> {
  return new Promise<Post>((resolve, reject) => {
    fetch(endPoint + "?id=" + id, { method: "GET" })
      .then((response) => response.json())
      .then((result: Post) => resolve(result))
      .catch(() => reject("Errore nel recupero dei dati"));
  });
}

export function postPost(body: Post): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result: string) => resolve(result))
      .catch(() => reject("Errore nella creazione del post"));
  });
}

export function deletePost(postId: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fetch(`${endPoint}?id=${encodeURIComponent(postId)}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          resolve();
        } else {
          reject("Errore nella cancellazione del post");
        }
      })
      .catch(() => reject("Errore nella cancellazione del post"));
  });
}

export function updatePost(postId: string, body: Post): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fetch(`${endPoint}?id=${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          resolve();
        } else {
          reject("Errore nell'aggiornamento del post");
        }
      })
      .catch(() => reject("Errore nell'aggiornamento del post"));
  });
}
