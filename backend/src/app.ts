import express from "express";
import { DatabaseService } from "./utils/config.js";
import { NovelRepository } from "./services/novel.repository.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
DatabaseService.drizzleInit();

app.use(cors());

app.get('/novels', async (req, res) => {
  const novelRepo = new NovelRepository();
  try {
    const result = await novelRepo.getAllNovels();
    res.json(result); 
  } catch (error) {
    console.error('Error fetching all novels:', error);
  }
});

app.get('/novels/:id/:cId', async (req, res) => {
  const novelRepo = new NovelRepository();
  try {
    const result = await novelRepo.getChapter(Number(req.params.id), Number(req.params.cId));
    res.json(result); 
  } catch (error) {
    console.error('Error fetching chapter:', error);
  }
});

app.get('/novelTotalChapters/:id', async (req, res) => {
  const novelRepo = new NovelRepository();
  try {
    const result = await novelRepo.getTotalChapters(Number(req.params.id));
    res.json(result); 
  } catch (error) {
    console.error('Error fetching total chapters:', error);
  }
});

app.get('/novelInfo/:id', async (req, res) => {
  const novelRepo = new NovelRepository();
  try {
    const result = await novelRepo.getNovelInfo(Number(req.params.id));
    res.json(result);
  } catch (error) {
    console.error(`Error trying to GET series info for novelId ${req.params.id}: ${error}`);
    throw error;
  }
});

export { app };
