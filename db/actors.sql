USE movies;

DROP TABLE IF EXISTS actors;

CREATE TABLE actors (
    actors_id TINYINT NOT NULL PRIMARY KEY,
    actors_name VARCHAR(250) NULL
);

INSERT INTO actors (actors_id, actors_name)
VALUES (1, 'Will Smith'),
       (2, 'Martin Lawrence'),
       (3, 'Adam Sandler'),
       (4, 'Adam Sandler');
