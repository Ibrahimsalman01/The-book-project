import { EntitySchema } from "@mikro-orm/core";


export class Book {
    bookId!: number; // dont need to fill
    title!: string;
    author!: string;
    synopsis!: string;
    genres!: string[];
    datePublished!: Date; // dont need to fill
    rating!: number; // dont need to fill
    coverImage!: string;
    story!: string;

    public toString(): string {
        return `Book title=${this.title}, author=${this.author}, 
                synopsis=${this.synopsis}, genres=${this.genres}, 
                datePublished=${this.datePublished}, rating=${this.rating}, 
                coverImage=${this.coverImage}`;
    }
}

interface Builder {
    setTitle(title: string): BookBuilder;
    setAuthor(author: string): BookBuilder;
    setSynopsis(synopsis: string): BookBuilder;
    setGenres(genres: string[]): BookBuilder;
    setDatePublished(datePublished: Date): BookBuilder; // dont need to set
    setRating(rating: number): BookBuilder; // dont need to set
    setCoverImage(coverImage: string): BookBuilder;
    setStory(story: string): BookBuilder;
    build(): Book;
}

export class BookBuilder implements Builder {
    declare private book: Book;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.book = new Book();
    }

    public setTitle(title: string): BookBuilder {
        this.book.title = title;
        return this;
    }

    public setAuthor(author: string): BookBuilder {
        this.book.author = author;
        return this;
    }

    public setSynopsis(synopsis: string): BookBuilder {
        this.book.synopsis = synopsis;
        return this;
    }

    public setGenres(genres: string[]): BookBuilder {
        this.book.genres = genres;
        return this;
    }
    
    public setDatePublished(datePublished: Date): BookBuilder {
        this.book.datePublished = datePublished;
        return this;
    }

    public setRating(rating: number): BookBuilder {
        this.book.rating = rating;
        return this;
    }

    public setCoverImage(coverImage: string): BookBuilder {
        this.book.coverImage = coverImage;
        return this;
    }

    public setStory(story: string): BookBuilder {
        this.book.story = story;
        return this;
    }

    public build(): Book {
        const result = this.book;
        this.reset();
        return result;
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
        genres: {type: 'array', persist: false, nullable: false },
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
            default: 0.0,
            nullable: false
        },
        coverImage: {
            name: 'cover_image',
            type: 'varchar',
            length: 255
        },
        story: { type: 'text', persist: false, nullable: false }
    }
});