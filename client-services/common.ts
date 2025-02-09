const dotenv = require("dotenv");
dotenv.config();

const endPoint: string = "https://api.cloudinary.com/v1_1/dqny9m8gt/image/upload";

export function upload(file:File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append("upload_preset", "ml_default"); 
  return new Promise<string>((resolve, reject) => {
    fetch(endPoint, { method: "POST" ,body:formData})
      .then((response) => response.json())
      .then((result: any) => resolve(result?.secure_url))
      .catch(() => reject("Errore nel recupero dei dati"));
  });
}