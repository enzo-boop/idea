"use client";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
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
  Menu,
  MenuItem,
} from "@mui/material";
import { Delete, Edit, Favorite, MoreVertSharp, Share } from "@mui/icons-material";
import ConfirmationDialog from "@/components/dialog.component";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [anchorEl, setAnchorEl] = useState<Element|null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);  
  
  const open = Boolean(anchorEl);
  let triggeredId: string|null= null;
  
  const handleClick = (event: MouseEvent<MouseEvent|HTMLButtonElement>) => setAnchorEl(event.currentTarget as Element);
  const handleClose = () => setAnchorEl(null);
  const handleDelete = async (id:string) => await deletePost(id);
  const dialogTriggered =  (id:string) => {
    triggeredId = id;
    setDialogOpen(true)};
  const close =  (value:boolean) =>{
    if(value && triggeredId) handleDelete(triggeredId);
    triggeredId = null;
    setDialogOpen(false);
    };

  useEffect(() => {
    getPosts()
      .then((res: Post[]) => setPosts(res))
      .finally(() => setIsLoading(false));
  }, [handleDelete]);

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
                <div>
                  <IconButton aria-label="settings" onClick={(e)=>handleClick(e)}>
                    <MoreVertSharp />
                  </IconButton>
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={()=>handleDelete(res.id!)}>
                      <Edit fontSize="small" style={{ marginRight: 8 }} />
                      Modifica
                    </MenuItem>
                    <MenuItem onClick={()=>dialogTriggered(res.id!)}>
                      <Delete fontSize="small" style={{ marginRight: 8 }} />
                      Elimina
                    </MenuItem>
                  </Menu>
                </div>
              }
              title={res.title}
              subheader={
                res.createdAt
                  ? new Date(res.createdAt).toLocaleDateString()
                  : ""
              }
              classes={{
                title: "dark:text-slate-50 fw-bold",
                subheader: "dark:text-slate-500",
              }}
            />
            <CardMedia component="img" height="194" image={res.imageUrl} />
            <CardContent>
              <Typography variant="body2" className="prose dark:prose-invert">
                {res.content}
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
       <ConfirmationDialog
        open={dialogOpen}
        close={close}
        title="Conferma eliminazione"
        text="Sei sicuro di voler eliminare questo post?"
      />
    </div>
  );
}
