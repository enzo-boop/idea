"use client";
import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import { PhotoCamera, Save } from "@mui/icons-material";
import { postPost } from "@/client-services/post-service";
import { Post as PostModel } from "../globals/models/models";

export default function Post() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setImage(event.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64File = reader.result?.toString().split(",")[1];
        const body: PostModel = {
          author: title,
          text: text,
          image_url: base64File,
        } as PostModel;
        console.log(body);
        postPost(body).then(() => (location.href = "/"));
      };
      reader.readAsDataURL(image)
    }
  };

  return (
    <Container
      className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50"
      component="main"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Crea un post
        </Typography>
        {
          <Avatar
            src={image ? URL.createObjectURL(image) : "alt-img.jpg"}
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
    </Container>
  );
}
