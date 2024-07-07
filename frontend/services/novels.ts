import axios from "axios";

const baseUrl = 'http://localhost:3000/novels';


export async function getChapter(novelId: number, chapterNumber: number): Promise<string[]> {
  try {
    const response = await axios.get(`${baseUrl}/${novelId}/${chapterNumber}`);
    return response.data;
  } catch (error) {
    console.error(`Error trying to retrieve novels from API: ${error}`);
    return [];
  }
}