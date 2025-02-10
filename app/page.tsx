"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Post } from "./globals/models/models";
import { getPosts } from "@/client-services/post-service";

export default function Home() {
  // const { data, error, isLoading } = useQuery(["data"], async () => {
  //   const response = await getPosts();
  //   if (!response.ok) throw new Error("Failed to fetch");
  //   return response;
  // });

  return (
    <div className="prose dark:prose-invert">
      {/* {posts?.map((res, index) => (
        <div key={index} className="mt-4">
          <div className="post">
            <h3>{res.author}</h3>
            <Image
              src={res?.image_url ?? "alt-img.jpg"}
              alt="Descrizione immagine"
              width={800}
              height={600}
              quality={80}
            />
            <p>{res?.text}</p>
            <p className="creation_date mb-0">Data creazione</p>
            <span className="display-date">
              {new Date(res?.created_at ?? "").toDateString()}
            </span>
          </div>
        </div>
      ))} */}
    </div>
  );
}
