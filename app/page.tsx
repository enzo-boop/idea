"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Post } from "./globals/models/models";
import { getPosts } from "@/client-services/post-service";
import { useEffect, useState } from "react";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import { Favorite, MoreVertSharp, Share } from "@mui/icons-material";
import { red } from "@mui/material/colors";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    getPosts().then((res: Post[]) => setPosts(res));
  }, []);
  return (
    <div className="prose dark:prose-invert">
      {posts?.map((res, index) => (
        <Card key={index} sx={{ maxWidth: 560}}>
          <CardHeader
            avatar={<Avatar/>}
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
          />
          <CardMedia component="img" height="194" image={res.image_url} />
          <CardContent>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {res.text}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <Favorite />
            </IconButton>
            <IconButton aria-label="share">
              <Share />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
