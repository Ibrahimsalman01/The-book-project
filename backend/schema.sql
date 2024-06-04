/**
    Use this to initialize the database
    (Must do manually, initialization is not manual)
**/

-- DROP TABLE IF EXISTS book_genres;
-- DROP TABLE IF EXISTS genres;
-- DROP TABLE IF EXISTS book_stories;
-- DROP TABLE IF EXISTS books;


-- books
CREATE TABLE books (
	book_id 		SERIAL PRIMARY KEY,
	title 			VARCHAR(100) UNIQUE NOT NULL,
	author 			VARCHAR(50) NOT NULL,
	synopsis 		TEXT NOT NULL,
	date_published 	DATE DEFAULT CURRENT_DATE NOT NULL,
	rating 			DECIMAL(3, 1) CHECK(rating >= 0.0 AND rating <= 10.0) DEFAULT 0.0 NOT NULL,
	cover_image 	VARCHAR(255) -- will need a default book cover
);

INSERT INTO books (title, author, synopsis, date_published, rating)
VALUES 	('The Great Gatsby', 'F. Scott Fitzgerald', 'It tells the story of Jay Gatsby, a self-made millionaire, and his pursuit of Daisy Buchanan, a wealthy young woman whom he loved in his youth.', '1925-04-10', 8.8),
		('To Kill a Mockingbird', 'Harper Lee', 'Set in small-town Alabama, the novel is a bildungsroman, or coming-of-age story, and chronicles the childhood of Scout and Jem Finch as their father Atticus defends a Black man falsely accused of rape.', '1960-07-11', 9.4),
		('1984', 'George Orwell', 'It tells the story of Winston Smith, a citizen of the miserable society of Oceania, who is trying to rebel against the Party and its omnipresent symbol, Big Brother.', '1949-06-08', 9.0),
		('Testing Book', 'N/A', 'This is a sample book for testing', '2024-5-25', 0.0);


-- stories		
CREATE TABLE book_stories (
	book_id 	INT 	REFERENCES books(book_id) ON DELETE CASCADE,
	story_id 	SERIAL 	PRIMARY KEY,
	story 		TEXT 	NOT NULL
);

INSERT INTO book_stories (book_id, story)
VALUES 	(1, 'Placeholder story 1'),
		(2, 'Placeholder story 2'),
		(3, 'Placeholder story 3'),
		(4, 'Placeholder story 4');


CREATE TABLE genres (
	genre_id 	SERIAL PRIMARY KEY,
	genre 		VARCHAR(40) UNIQUE NOT NULL
);

INSERT INTO genres (genre)
VALUES 	('Tragedy'),
        ('Southern Gothic'),
        ('Bildungsroman'),
        ('Science fiction'),
        ('Dystopian Fiction'),
        ('Social science fiction'),
        ('Political fiction'),
        ('Placeholder genre');

-- genres
CREATE TABLE book_genres (
	book_id 	INT REFERENCES books(book_id) ON DELETE CASCADE,
	genre_id 	INT REFERENCES genres(genre_id) ON DELETE CASCADE,
	PRIMARY KEY (genre_id, book_id)
);

INSERT INTO book_genres (book_id, genre_id)
VALUES  (1, 1),
        (2, 2),
        (2, 3),
        (3, 4),
        (3, 5),
        (3, 6),
        (3, 7),
        (4, 8);