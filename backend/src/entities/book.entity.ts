import { EntitySchema } from "@mikro-orm/core";

export class Book {
    bookId: number;
    title: string;
    author: string;
    synopsis: string;
    // genres: string[];
    datePublished: Date;
    rating: number;
    coverImage: string;
    // story: string;

    constructor(
        bookId: number, title: string, author: string, 
        synopsis: string, datePublished: Date, rating: number,
        coverImage: string) {
        
            this.bookId = bookId;
            this.title = title;
            this.author = author;
            this.synopsis = synopsis;
            this.datePublished = datePublished;
            this.rating = rating;
            this.coverImage = coverImage;
    }
}

export const schema = new EntitySchema<Book>({
    class: Book,
    tableName: 'books',
    properties: {
        bookId: {
            name: 'book_id',
            type: 'int',
            primary: true
        },
        title: { type: 'varchar', length: 100, unique: true, nullable: false },
        author: { type: 'varchar', length: 50, nullable: false },
        synopsis: { type: 'text', nullable: false },
        datePublished: {
            name: 'date_published',
            type: 'date',
            defaultRaw: 'CURRENT_DATE',
            nullable: false
        },
        rating: {
            type: 'decimal', 
            precision: 3, 
            scale: 1,
            check: 'rating >= 0.0 AND rating <= 10.0',
            default: 0,
            nullable: false
        },
        coverImage: {
            name: 'cover_image',
            type: 'varchar',
            length: 255
        }
    }
});