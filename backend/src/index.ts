import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema.js";
import pkg from 'pg';
import { BookRepository } from "./services/book.repository.js";
import { BookBuilder } from "./services/book.builder.js";
import { DatabaseService } from "./utils/database.config.js";

DatabaseService.drizzleInit();

async function test() {
	try {
		// const newBook = new BookBuilder()
		// .setTitle('SCARY2')
		// .setAuthor('Vegeta')
		// .setSynopsis('A synopsis')
		// .setGenres(['Thriller', 'Depression']) // LIMIT NUMBER OF GENRES USER CAN PUT
		// .setCoverImage('test')
		// .setStory('This is the story of the new book.')
		// .build();


		const bookRepo = new BookRepository();
		// const test1 = await bookRepo.getAllBooks();
		// const test2 = await bookRepo.getBook(1);
		// console.log(test1)

    const deletedBookId = await bookRepo.deleteBook(104);
    console.log(deletedBookId);
		// await bookRepo.createBook(newBook); // createBook should return the book so we can add to the frontend
		DatabaseService.closePool();
	} catch (error) {
    console.error(`Error: ${error}`);
	}
}

test();
