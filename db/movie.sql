USE movies;

DROP TABLE IF EXISTS movies;

CREATE TABLE movies(
 id INT NULL PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(50) NOT NULL,
 genere VARCHAR(70) NOT NULL,
 year YEAR NOT NULL, 
 country VARCHAR(70) NULL,
 image VARCHAR(250) NULL,
 movie_time VARCHAR(10) NULL,

);

INSERT INTO movies(id,name, genere,year,country,
image,movie_time)
VALUES (1,'Bad Boys 1','action',1995,'Use','bad boys_1.webp','126 min'),
 (2,'Big Mama','action/comedy',2006,'Use','big mama2.jpg','126 min'),
 (3,'Click','comedy',2006,'Use','click.jpg','93 min'),
 (4,'Grown Up','comedy',2010,'Use','grown up.jpg','100 min');
