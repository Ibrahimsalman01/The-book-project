import { completeBook } from '../schema/schema.js';

interface Builder {
    setTitle(title: string): BookBuilder;
    setAuthor(author: string): BookBuilder;
    setSynopsis(synopsis: string): BookBuilder;
    setGenres(genres: string[]): BookBuilder;
    setCoverImage(coverImage: string): BookBuilder;
    setStory(story: string): BookBuilder;
    build(): completeBook;
}

export class BookBuilder implements Builder {
    private book: completeBook;

    constructor() {
        this.reset();
    }

    public reset(): void {
        this.book = {} as completeBook; 
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
    
    public setCoverImage(coverImage: string): BookBuilder {
        this.book.coverImage = coverImage;
        return this;
    }

    public setStory(story: string): BookBuilder {
        this.book.story = story;
        return this;
    }

    public build(): completeBook {
        const result = this.book;
        this.reset();
        return result;
    }
}

