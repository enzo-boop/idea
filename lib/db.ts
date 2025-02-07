const { neon } = require("@neondatabase/serverless");
const dotenv = require("dotenv");
dotenv.config();
async function seed() {
  const sql = neon(process.env.DATABASE_URL!);

  await sql`
        CREATE TABLE IF NOT EXISTS posts (
            id SERIAL PRIMARY KEY,
            author VARCHAR(255) NOT NULL,
            text TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            image_url VARCHAR(255)
        );
    `;

  console.log("[LOG]:Seeding completato con successo!");
}

seed().catch(console.error);
