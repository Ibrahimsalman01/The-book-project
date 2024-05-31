import { BookRepository } from "./services/book.repository";
import { DatabaseService } from "./services/database_services";

async function getAllBooks() {
    try {
        // make sure to follow the order of the next 3 lines or else
        // em wont be initialized properly
        const dbService = new DatabaseService();
        await dbService.init();

        const bookRepo = new BookRepository();
        await bookRepo.readAllBooks();

        await dbService.closeORM();
    } catch (error) {
        console.error(`Error trying to retrieve all books: ${error}`);
    }
}

getAllBooks();