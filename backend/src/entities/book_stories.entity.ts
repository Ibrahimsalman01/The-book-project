import { EntitySchema } from "@mikro-orm/core";

interface BookStoryOptions {
    bookId?: number;
    storyId?: number;
}

export class BookStory {
    bookId?: number;
    storyId?: number;
    story: string;

    constructor(story: string, options: BookStoryOptions = {}) {
        this.story = story;
        this.bookId = options.bookId;
        this.storyId = options.storyId;
    }
}

export const schema = new EntitySchema<BookStory>({
    class: BookStory,
    tableName: 'book_stories',
    properties: {
        bookId: {
            name: 'book_id',
            type: 'int',
            deleteRule: 'cascade'
        },
        storyId: {
            name: 'story_id',
            type: 'int',
            primary: true
        },
        story: { type: 'text', nullable: false }
    }
});