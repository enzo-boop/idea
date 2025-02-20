"use client";
import { useEffect, useState } from "react";
import { Post } from "./globals/models/models";
import { deletePost, getPosts } from "@/client-services/post-service";
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
import { Delete, Edit, Favorite, Share } from "@mui/icons-material";
import ConfirmationDialog from "@/components/dialog.component";
import { GetToastContext } from "./contexts/toast.context";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [triggeredId, setTriggeredId] = useState<string | null>(null);
  const { setSettings } = GetToastContext();
  const get = () =>
    getPosts()
      .then((post: Post[]) => setPosts(post))
      .finally(() => setIsLoading(false));

  const handleDelete = async (id: string) =>
    deletePost(id).then(() => {
      setSettings({
        message: "Post eliminato correttamente!",
        autoHideDuration: 3000,
        open: true,
      });
      get();
    });

  const dialogTriggered = (id: string) => {
    setTriggeredId(id);
    setDialogOpen(true);
  };

  const close = (value: boolean) => {
    if (value && triggeredId) handleDelete(triggeredId);
    setTriggeredId(null);
    setDialogOpen(false);
  };

  useEffect(() => {
    get();
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
        posts.map((post, index) => (
          <Card key={index} sx={{ maxWidth: 560 }} className="mt-4">
            <CardHeader
              avatar={<Avatar src="sample_user.webp" />}
              action={
                session?.user && (
                  <div>
                    <IconButton
                      onClick={() => (location.href = "/post?id=" + post.id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => dialogTriggered(post.id!)}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                )
              }
              title={post.title}
              subheader={
                post.createdAt
                  ? new Date(post.createdAt).toLocaleDateString()
                  : ""
              }
              classes={{
                title: "dark:text-slate-50 fw-bold",
                subheader: "dark:text-slate-500",
              }}
            />
            <CardMedia component="img" height="194" image={post.imageUrl} />
            <CardContent>
              <Typography variant="body2" className="prose dark:prose-invert">
                {post.content}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className="justify-end">
              <IconButton aria-label="add to favorites" color="error">
                <Favorite />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
            </CardActions>
          </Card>
        ))
      )}
      <ConfirmationDialog
        open={dialogOpen}
        close={close}
        title="Conferma eliminazione"
        text="Sei sicuro di voler eliminare questo post?"
      />
    </div>
  );
}
