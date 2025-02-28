"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
  CircularProgress,
  SnackbarProps,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { PhotoCamera, Save, Article } from "@mui/icons-material";
import { getPost, postPost, updatePost } from "@/client-services/post-service";
import { Post as PostModel } from "../globals/models/models";
import { upload } from "@/client-services/common";
import { GetToastContext } from "../contexts/toast.context";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Post() {
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [id, setId] = useState<string | null>(null);
  const { setSettings } = GetToastContext();
  const isMobile = useMediaQuery("(max-width: 560px)");
  
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImage(event.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      setIsLoading(true);
      const image_url = image instanceof File ? await upload(image) : image;
      const body: PostModel = {
        title: title,
        content: text,
        imageUrl: image_url,
        published: true,
      } as PostModel;
      let promise: Promise<void | string> | null = null;
      if (id) promise = updatePost(id, body);
      else {
        body.userId = "516d9b74-eb15-44c4-b71b-2f45e16b02e7";
        promise = postPost(body);
      }
      promise
        .catch((err: Error) => {
          setIsLoading(false);
          throw err;
        })
        .then(() => {
          setSettings({
            open: true,
            autoHideDuration: 3000,
            message:
              "Post " + (id ? "modificato" : "creato") + " correttamente!",
          } as SnackbarProps);
          if (typeof window !== "undefined") location.href = "/";
        });
    }
  };

  useEffect(() => {
    const urlWithParams: string = location.search;
    const params: URLSearchParams = new URLSearchParams(urlWithParams);
    setId(params.get("id"));
  }, []);

  useEffect(() => {
    new Promise<void>(async (resolve) => {
      if (id) {
        const response = await getPost(id);
        setImage(response.imageUrl!);
        setText(response.content!);
        setTitle(response.title!);
      }
      resolve();
    }).finally(() => setIsLoading(false));
  }, [id]);

  if (!session?.user && typeof window !== "undefined") location.href = "/";

  return (
    <Container
      className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
      style={{ padding: 0 }}
    >
      {isLoading ? (
        <div className="flex justify-center items-center mt-4 spinner">
          <CircularProgress />
        </div>
      ) : (
        <div>
          <div className="prose dark:prose-invert">
            <div className="mt-4">
              <h3>
                <Article />
                {id ? "Modifica" : "Nuovo"} post
              </h3>
            </div>
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <CardMedia
              sx={{ width: isMobile ? "100vw" : 560, height: 360 }}
              image={
                image
                  ? image instanceof File
                    ? URL.createObjectURL(image)
                    : image
                  : "alt-img.jpg"
              }
            />
            <Container
              sx={{
                display: "flex",
                justifyContent: "end",
                padding: "0!important",
                marginTop: "15px",
              }}
            >
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
              >
                Carica
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Button>
            </Container>
            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
              {/* Titolo */}
              <TextField
                label="Aggiungi titolo.."
                variant="filled"
                fullWidth
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {/* Testo */}
              <TextField
                label="Aggiungi didascalia.."
                variant="filled"
                multiline
                rows={4}
                fullWidth
                margin="normal"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Container
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  padding: "0!important",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  component="label"
                  onClick={(e) => handleSubmit(e)}
                  startIcon={<Save />}
                >
                  Salva
                </Button>
              </Container>
            </form>
          </Box>
        </div>
      )}
    </Container>
  );
}
