import config from "./mikro-orm.config";
import { Book } from "./entities/book.entity";
import { MikroORM } from "@mikro-orm/postgresql";

async function addTestBook() {
    const orm = await MikroORM.init(config);
    const em = orm.em.fork();
    
    try {
        // const newBook = em.create<Book>('Book', {
        //     bookId: 5,
        //     title: 'Test 1',
        //     author: 'John Doe',
        //     synopsis: 'Some text',
        //     datePublished: new Date('2024-05-25'),
        //     rating: 0.0,
        //     coverImage: 'path/to/image.png'
        // });

        const newBook = new Book(
            6,
            'Test 2',
            'John Doe',
            'Some text',
            new Date('2024-05-25'),
            0.0,
            'path/to/image.png'
        );

        await em.persist(newBook).flush();

    } catch (error) {
        console.error(`Unable to add new book due to: ${error}`);
    } finally {
        await orm.close(true);
    }
}

addTestBook();