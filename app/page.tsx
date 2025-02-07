"use client";
import { useEffect, useState } from "react";
import { Post } from "./globals/models/models";
import { getPosts } from "@/client-services/post-service";

export default function Home() {
  const [posts, setPosts] = useState<Array<Post> | null>(null);

  useEffect(() => {
    getPosts().then((posts) => setPosts(posts));
  }, []);

  return (
    <div className="prose dark:prose-invert">
      {posts?.map((res, index) => (
        <div key={index} className="mt-4">
          <div className="post">
            <h3>
              <i className="fa fa-diamond mr-1"></i>
              {res.author}
            </h3>
            <img src={res.image_url} alt="post" />
            <p>{res?.text}</p>
            <p className="creation_date mb-0">Data creazione</p>
            <span className="display-date">
              {new Date(res?.created_at ?? "").toDateString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
