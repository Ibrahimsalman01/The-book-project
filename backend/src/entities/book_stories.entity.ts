import { EntitySchema } from "@mikro-orm/core";

interface bookStoryOptions {
    bookId?: number;
    storyId?: number;
}

export class bookStory {
    bookId?: number;
    storyId?: number;
    story: string;

    constructor(story: string, options: bookStoryOptions = {}) {
        this.story = story;
        this.bookId = options.bookId;
        this.storyId = options.storyId;
    }
}

export const schema = new EntitySchema<bookStory>({
    class: bookStory,
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