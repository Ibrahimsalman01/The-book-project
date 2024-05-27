import { EntitySchema } from "@mikro-orm/core";

export class Book {
    bookId?: number;
    title: string;
    author: string;
    synopsis: string;
    genres: string[];
    datePublished?: Date;
    rating?: number;
    coverImage: string;
    // story: string;

    constructor(
        title: string, author: string, synopsis: string, genres: string[],  coverImage: string,
        
        datePublished?: Date, 
        rating?: number, 
        bookId?: number
    ) {
        this.title = title;
        this.author = author;
        this.synopsis = synopsis;
        this.genres = genres;
        this.coverImage = coverImage;
        this.bookId = bookId; 
        this.datePublished = datePublished;
        this.rating = rating;
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
        genres: {type: 'array', nullable: false, persist: false },
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