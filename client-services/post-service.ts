const dotenv = require("dotenv");
import { Post } from "@/app/globals/models/models";
dotenv.config();
const endPoint: string = process.env.BASE_URL + "api/post";
console.log(endPoint);
export function getPosts(): Promise<Array<Post>> {
  return new Promise<Array<Post>>((resolve, reject) => {
    fetch(endPoint, { method: "GET" })
      .then((response) => response.json())
      .then((result: Array<Post>) => resolve(result))
      .catch(() => reject("Errore nel recupero dei dati"));
  });
}

export function postPost(body: Post): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((result: number) => resolve(result))
      .catch(() => reject("Errore nella creazione del post"));
  });
}

export function deletePost(postId: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fetch(`${endPoint}/${postId}`, {
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

export function updatePost(postId: number, body: Post): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fetch(`${endPoint}/${postId}`, {
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
