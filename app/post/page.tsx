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
} from "@mui/material";
import { PhotoCamera, Save, Article, Boy } from "@mui/icons-material";
import { getPost, postPost, updatePost } from "@/client-services/post-service";
import { Post as PostModel } from "../globals/models/models";
import { upload } from "@/client-services/common";
import { GetToastContext } from "../contexts/toast.context";
import { useEffect } from "react";

export default function Post() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { settings, setSettings } = GetToastContext();
  const params: URLSearchParams = new URLSearchParams(window.location.search);
  const id = params.get("id");
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
        (body.userId = "516d9b74-eb15-44c4-b71b-2f45e16b02e7");
          (promise = postPost(body));
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
            message: "Post " + id ? "modificato" : "creato" + "correttamente!",
          });
          window.location.href = "/";
        });
    }
  };

  useEffect(() => {
    if (id) {
      getPost(id).then((response) => {
        setImage(response.imageUrl!);
        setText(response.content!);
        setTitle(response.title!);
      });
    }
    setIsLoading(false);
  }, []);

  return (
    <Container
      className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
      component="main"
    >
      {isLoading ? (
        <div className="flex justify-center items-center mt-4 spinner">
          <CircularProgress />
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              marginTop: "20px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Article />
            {id ? "Modifica" : "Nuovo"} post
          </Typography>
          {
            <Avatar
              src={
                image
                  ? image instanceof File
                    ? URL.createObjectURL(image)
                    : image
                  : "alt-img.jpg"
              }
              alt="Anteprima immagine"
              sx={{ width: 300, height: 300, marginBottom: 2 }}
            />
          }
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
      )}
    </Container>
  );
}
