import cors from "cors";
import express from "express";
import helmet from "helmet";
import { getNews } from "./newsScrapper";

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN =
  process.env.NODE_ENV === "dev"
    ? "http://localhost:3000"
    : process.env.NODE_ENV === "prod"
    ? "https://see-covid19.netlify.app/"
    : false;

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: CORS_ORIGIN }));

app.post("/api/news", async (req, res) => {
  const { country } = req.body;
  const result = await getNews(country);
  res.send(result);
});

app.listen(PORT, () =>
  console.log(`✅ Express Server listening on port ${PORT}`)
);
