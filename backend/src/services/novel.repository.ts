import { DatabaseService } from "../utils/config.js";
import { Novels, Chapters } from "../schema/schema.js";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../utils/firebase.config.js";
import { and, eq } from "drizzle-orm/pg-core/expressions";
import { count } from 'drizzle-orm'

export interface novelObject {
  novelId: number;
  chapterId: number;
  seriesName: string;
  chapterNumber: number;
  pages: string[];
};

interface novelInfoObject {
  novelId: number;
  coverImage: string;
  seriesName: string;
  summary: string;
  author: string;
  rating: string;
  genres: string[];
};

export class NovelRepository {
  private db = DatabaseService.drizzleInit();
  private storageUrl: string = 'gs://the-book-project-ccf55.appspot.com';

  private async getImage(imagePath: string): Promise<string> {  
    try {
      const storageRef = ref(storage, imagePath);
      const downloadURL = await getDownloadURL(storageRef);

      return downloadURL;
    } catch (error) {
      console.error('Error uploading image: ', error);
    } 
  }

  private async findChapter(series: string, chapterNum: number): Promise<string[]> {
    try {
      const seriesRef = ref(storage, `${series}`);
      const seriesList: string[] = [];
      const res = await listAll(seriesRef);

      for (const itemRef of res.items) {
        if (itemRef.toString().includes(`_ch${chapterNum}_`)) {
          const image = await this.getImage(itemRef.toString());
          seriesList.push(image);
        }
      }

      return seriesList;
    } catch (error) {
      console.error('Error retrieving chapter: ', error);
    }
  }

  public async getllNovels() {
    try {
      const novelQuery = await this.db.select().from(Novels);
      return novelQuery;
    }
    catch (error) {
      console.error(`Error retrieving novels: ${error}`);
    }
  }

  public async getTotalChapters(novelId: number) {
    try {
      const countQuery = await this.db
        .select({ count: count(Chapters.chapterId) })
        .from(Chapters)
        .where(
          eq(Chapters.novelId, novelId)
        );

      const totalChapters = countQuery[0].count;
      return totalChapters;
    } catch (error) {
      console.error(`Error retrieving total chapters: ${error}`);
      throw error;
    }
  }

  public async getChapter(novelId: number, chapterNumber: number) {
    try {
      const novelQuery = await this.db
        .select()
        .from(Novels) 
        .where(
          eq(Novels.novelId, novelId)
        );

      const chapterQuery = await this.db
        .select()
        .from(Chapters) 
        .where(
          eq(Chapters.chapterNumber, chapterNumber)
        );

      const pages = await this.findChapter(
        novelQuery[0].seriesName, 
        chapterQuery[0].chapterNumber
      );

      const chapter: novelObject = {
        novelId: novelQuery[0].novelId,
        chapterId: chapterQuery[0].chapterId,
        seriesName: novelQuery[0].seriesName,
        chapterNumber: chapterQuery[0].chapterNumber,
        pages
      };

      return chapter;
    } catch (error) {
      console.error(`Error retrieving chapter: ${error}`);
    }
  }

  private async getCoverImage() {}

  // genres need to be set up similarly to how books were set up
  public async getNovelInfo(novelId: number): Promise<object> {
    try {
      const novelQuery = await this.db
        .select()
        .from(Novels)
        .where(eq(Novels.novelId, novelId));

      const chapterQuery = await this.db
        .select()
        .from(Chapters)
        .where(eq(Chapters.novelId, novelId));

      console.log(chapterQuery);

      const coverImage = await this.getImage(`${this.storageUrl}/${novelQuery[0].seriesName}/${novelQuery[0].seriesName}_cover.jpg`);
      
      const seriesObject: novelInfoObject = {
        novelId: novelQuery[0].novelId,
        coverImage,
        seriesName: novelQuery[0].seriesName,
        summary: novelQuery[0].summary,
        author: novelQuery[0].author,
        rating: novelQuery[0].rating,
        genres: ['genre 1', 'genre 2']
      };

      return seriesObject;
    } catch (error) {
      console.error(`Error trying to retrieve series info: ${error}`);
    }
  }

  public async getAllNovels(): Promise<Object[]> {
    const allNovels = await this.db
      .select()
      .from(Novels);

    console.log(allNovels)

    return null;
  }

  private async folderExists(seriesName: string): Promise<boolean> {
    try {
      const folderRef = ref(storage, seriesName + '/');
      const folder = await listAll(folderRef);
      
      return folder.items.length > 0 || folder.prefixes.length > 0;
    } catch (error) {
      console.error(`Error checking if folder exists: ${error}`);
      return false;
    }
  }

  public async uploadChapter(seriesName: string) {
    try {
      const doesExist = await this.folderExists(seriesName);
      if (await this.folderExists(seriesName)) {
        // add to the existing folder
      } else {
        // create a new folder and add the chapter
      }
    } catch (error) {
      console.error(`Error trying to upload chapter: ${error}`);
    }
  }

}
