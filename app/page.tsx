"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Post } from "./globals/models/models";
import { getPosts } from "@/client-services/post-service";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import { Favorite, MoreVertSharp, Share } from "@mui/icons-material";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getPosts()
      .then((res: Post[]) => setPosts(res))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="posts-wrapper place-self-center">
      {isLoading ? (
        <div className="flex justify-center items-center mt-4 spinner">
          <CircularProgress />
        </div>
      ) : posts.length === 0 ? (
        <Typography
          variant="h6"
          className="text-center mt-4 dark:text-slate-300"
        >
          Nessun post disponibile...
        </Typography>
      ) : (
        posts.map((res, index) => (
          <Card key={index} sx={{ maxWidth: 560 }} className="mt-4">
            <CardHeader
              avatar={<Avatar />}
              action={
                <IconButton aria-label="settings">
                  <MoreVertSharp />
                </IconButton>
              }
              title={res.author}
              subheader={
                res.created_at
                  ? new Date(res.created_at).toLocaleDateString()
                  : ""
              }
              classes={{
                title: "dark:text-slate-50 fw-bold",
                subheader: "dark:text-slate-500",
              }}
            />
            <CardMedia component="img" height="194" image={res.image_url} />
            <CardContent>
              <Typography variant="body2" className="prose dark:prose-invert">
                {res.text}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="justify-end">
              <IconButton aria-label="add to favorites">
                <Favorite />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </CardActions>
          </Card>
        ))
      )}
    </div>
  );
}
