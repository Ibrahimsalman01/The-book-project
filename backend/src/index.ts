import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema/schema.js";
import pkg from 'pg';
import { BookRepository } from "./services/book.repository.js";
import { BookBuilder } from "./services/book.builder.js";
import { UserRepository } from "./services/user.repository.js";
import { UserBuilder } from "./services/user.builder.js";
import { FirebaseRepository } from "./services/firebase.repository.js";
import { DatabaseService } from "./utils/database.config.js";
import { readFileSync } from "fs";


DatabaseService.drizzleInit();

async function test() {
	try {
		/* const newBook = new BookBuilder()
		.setTitle('SCARY2')
		.setAuthor('Vegeta')
		.setSynopsis('A synopsis')
		.setGenres(['Thriller', 'Depression']) //LIMIT NUMBER OF GENRES USER CAN PUT
		.setCoverImage('test')
		.setStory('This is the story of the new book.')
		.build(); */

    const newUser = new UserBuilder()
    .setUsername("baoinadaze")
    .setEmail("bao@gmail.com")
    .setPassword("1234")
    .build();

    const userRepo = new UserRepository();

    const fbRepo = new FirebaseRepository();


    //const filePath = 'C:/Users/baole/Desktop/The-book-project/backend/images/hsr.png';
    //await fbRepo.uploadImage(filePath)

	const imagePath = 'test-series/bao-image-test.png'
	await fbRepo.getImage(imagePath)

    //await userRepo.registerUser(newUser)
    //await userRepo.loginUser("bao@gmail.com", "1234")


		//const bookRepo = new BookRepository();
		// const test1 = await bookRepo.getAllBooks();
		// const test2 = await bookRepo.getBook(1);
		// console.log(test1)



    //const deletedBookId = await bookRepo.deleteBook(104);
    //console.log(deletedBookId);
		// await bookRepo.createBook(newBook); // createBook should return the book so we can add to the frontend
		DatabaseService.closePool();
	} catch (error) {
    console.error(`Error: ${error}`);
	}
}

test();
