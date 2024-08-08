import axios from "axios";
import { novelObject } from "../src/ChapterPage";

const baseUrl = 'http://localhost:3000/novels';

export async function getChapter(novelId: number, chapterNumber: number): Promise<object> {
  try {
    const response = await axios.get(`${baseUrl}/${novelId}/${chapterNumber}`);
    return response.data as novelObject;
  } catch (error) {
    console.error(`Error trying to retrieve novels from API: ${error}`);
    return [];
  }
}

export async function getTotalChapters(novelId: number): Promise<number> {
  try {
    const response = await axios.get(`http://localhost:3000/novelTotalChapters/${novelId}`);

    return response.data;
  } catch (error) {
    console.error(`Error trying to retrieve total chapters from API: ${error}`);
    return 0;
  }
}

export async function getNovelPageInfo(novelId: number): Promise<object> {
  try {
    const response = await axios.get(`http://localhost:3000/novelInfo/${novelId}`);
    return response.data;
  } catch (error) {
    console.error(`Error trying to retrieve novel info: ${error}`);
    throw error;
  }
}