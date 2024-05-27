import { EntitySchema } from "@mikro-orm/core";

export class Genre {
    genreId?: number; 
    genre: string;

    constructor(
        genre: string,
        genreId?: number
    ) {
        this.genre = genre;
        this.genreId = genreId;
    }
    
}

export const schema = new EntitySchema<Genre>({
    class: Genre,
    tableName: 'genres',
    properties: {
        genreId: {
            name: 'genre_id',
            type: 'int',
            primary: true
        },
        genre: { type: 'varchar', length: 40, unique: true, nullable: false },
    }
});