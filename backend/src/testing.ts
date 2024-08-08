import { NovelRepository } from "./services/novel.repository.js";


async function main() {
  try {
    const novelRepo = new NovelRepository();
    const info = await novelRepo.getNovelInfo(1);
    console.log(info);

  } catch (error) {
    console.error(`Error trying to test: ${error}`);
  }
}

main();