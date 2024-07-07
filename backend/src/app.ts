import e from "express";
import { DatabaseService } from "./utils/database.config.js";
import { FirebaseRepository } from "./services/firebase.repository.js";
import { NovelRepository } from "./services/novel.repository.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = e();
DatabaseService.drizzleInit();

app.use(cors());

app.get('/novels', async (req, res) => {
  const novelRepo = new NovelRepository();
  const result = await novelRepo.getAllNovels();
  console.log(result);
  res.send(result);
});

app.get('/novels/:id/:cId', async (req, res) => {
  const novelRepo = new NovelRepository();
  const result = await novelRepo.getChapter(Number (req.params.id), Number (req.params.cId));
  
  res.send(result);
});

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});