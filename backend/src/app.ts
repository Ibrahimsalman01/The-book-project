import e from "express";
import { DatabaseService } from "./utils/database.config.js";
import { FirebaseRepository } from "./services/firebase.repository.js";
import dotenv from "dotenv";
dotenv.config();

const app = e();
const PORT = process.env.APP_PORT;
DatabaseService.drizzleInit();

app.get('/books', async (req, res) => {
  const fbRepo = new FirebaseRepository();
  const result = await fbRepo.getChapter('test series 2', '01');

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});