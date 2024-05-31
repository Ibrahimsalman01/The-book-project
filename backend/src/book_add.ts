import config from "./mikro-orm.config";
import { Book } from "./entities/book.entity";
import { BookBuilder } from "./entities/book.entity";
import { Genre } from "./entities/genre.entity";
import { BookGenre } from "./entities/book_genres.entity";
import { BookStory } from "./entities/book_stories.entity";
import { MikroORM } from "@mikro-orm/postgresql";
import { Services, initORM } from "./db";
import { BookRepository } from "./services/book_repository";
import { DatabaseService } from "./services/database_services";

async function addTestBook() {
    /* const orm = await MikroORM.init(config);
    const em = orm.em.fork(); */

    try {
        /* const newBook = new Book(
            8,
            'Test 5',
            'Jane Doe',
            'Some text',
            ["Horror", "Romance"],
            new Date('2024-05-26'),
            0.0,
            'path/to/image.png'
        ); */

        // const newBook = new Book(
        //     'Test 17',
        //     'John Doe',
        //     'A great book',
        //     ["Comedy"],
        //     'path/to/image.png',
        //     'This is a story'
        // );


        
        const dbService = new DatabaseService();
        await dbService.init()

        const bookBuilder = new BookBuilder(); 

        bookBuilder
            .setTitle('Test 65')
            .setAuthor('Giovanni Doe')
            .setSynopsis('5/31/24')
            .setGenres(["Slice of Life"])
            .setCoverImage("some/image.png")
            .setStory('5/31/24 the story test');

        const newBook: Book = bookBuilder.build();

        
        const newBookRepo : BookRepository = new BookRepository();
        await newBookRepo.pushBook(newBook);
        await newBookRepo.pushGenres(newBook);
        await newBookRepo.pushStories(newBook);

        await dbService.closeORM();
        

    } catch (error) {
        console.error(`Unable to add new book due to: ${error}`);
    } 
}

addTestBook();