import config from "./mikro-orm.config";
import { Book } from "./entities/book.entity";
import { Genre } from "./entities/genre.entity";
import { BookGenre } from "./entities/book_genres.entity";
import { MikroORM } from "@mikro-orm/postgresql";

async function addTestBook() {
    const orm = await MikroORM.init(config);
    const em = orm.em.fork();

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

        const newBook = new Book(
            'Test 16',
            'John Doe',
            'A great book',
            ["Comedy"],
            'path/to/image.png',    
        );


        await em.persist(newBook).flush()
        .then(async () => {
            const currBookId = newBook.bookId;
            const genresArray = newBook.genres;
        
            for (const currGenre of genresArray) {
                let checkGenre = await em.findOne(Genre, { genre: currGenre });
                if (!checkGenre) { //if genre does not exist
                    const newGenre = new Genre(currGenre);
                    await em.persist(newGenre).flush() //add genre to genre table
                    .then(async () => {
                        // ! operator to TS that those values can not be null
                        const bookGenre = new BookGenre(currBookId!, newGenre.genreId!); //create book genre
                        await em.persist(bookGenre).flush(); //push book genre to table
                    })
                } else { //if genre exists
                    const bookGenre = new BookGenre(currBookId!, checkGenre.genreId!);
                    await em.persist(bookGenre).flush();
                } 
            }
        });

    } catch (error) {
        console.error(`Unable to add new book due to: ${error}`);
    } finally {
        await orm.close(true);
    }
}

addTestBook();