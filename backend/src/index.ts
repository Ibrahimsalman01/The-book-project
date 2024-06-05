import { dbUrl } from "./utils/database.config.js";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema.js";
import pkg from 'pg';
import { BookRepository } from "./services/book_repository.js";
import { BookBuilder } from "./services/book_builder.js";
import { DatabaseService } from "./services/database_services.js";

DatabaseService.drizzleInit();

async function test() {
	try {

		const newBook = new BookBuilder()
		.setTitle('SCARY')
		.setAuthor('Vegeta')
		.setSynopsis('A synopsis')
		.setGenres(['Thriller', 'Depression']) // LIMIT NUMBER OF GENRES USER CAN PUT
		.setCoverImage('test')
		.setStory('This is the story of the new book.')
		.build();


		const bookRepo = new BookRepository();
		const test1 = await bookRepo.getAllBooks();
		//const test2 = await bookRepo.getBook(1);
		//console.log(test1)
		//await bookRepo.createBook(newBook);
		DatabaseService.closePool();
	}
	catch (error) {
        console.error(`Error: ${error}`);
	}
}

test();
