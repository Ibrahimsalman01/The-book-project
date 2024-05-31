import config from "./mikro-orm.config";
import { Book } from "./entities/book.entity";
import { BookBuilder } from "./entities/book.entity";
import { Genre } from "./entities/genre.entity";
import { BookGenre } from "./entities/book_genres.entity";
import { BookStory } from "./entities/book_stories.entity";
import { MikroORM } from "@mikro-orm/postgresql";
import { Services, initORM } from "./config/database.config";
import { BookRepository } from "./services/book.repository";
import { DatabaseService } from "./services/database_services";

async function addTestBook() {
    try {
        const dbService = new DatabaseService();
        await dbService.init();

        const bookBuilder = new BookBuilder(); 

        const newBook: Book = bookBuilder
            .setTitle('Test 67')
            .setAuthor('Giovanni Doe')
            .setSynopsis('5/31/24')
            .setGenres(["Slice of Life"])
            .setCoverImage("some/image.png")
            .setStory('5/31/24 the story test')
            .build();

        const newBookRepo: BookRepository = new BookRepository();
        await newBookRepo.createBook(newBook);
        await dbService.closeORM();

    } catch (error) {
        console.error(`Unable to add new book due to: ${error}`);
    } 
}

addTestBook();