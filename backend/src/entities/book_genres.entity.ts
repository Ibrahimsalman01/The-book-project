import { EntitySchema } from "@mikro-orm/core";

export class BookGenre {
    bookId: number;
    genreId: number;

    constructor(
        bookId: number,
        genreId: number
    ) {
        this.bookId = bookId;
        this.genreId = genreId;
    }
    
}

export const schema = new EntitySchema<BookGenre>({
    class: BookGenre,
    tableName: 'book_genres',
    properties: {
        bookId: {
            name: 'book_id',
            type: 'int',
            deleteRule: 'cascade',
            primary: true
        },
        genreId: {
            name: 'genre_id',
            type: 'int',
            deleteRule: 'cascade',
            primary: true
        }
    }
});